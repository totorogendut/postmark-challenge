import { encodeBase32LowerCase } from "@oslojs/encoding";
import { fail } from "@sveltejs/kit";
import { hash, verify } from "@node-rs/argon2";
import { db } from "../db";
import {
	createSession,
	generateSessionToken,
	setSessionTokenCookie,
} from "./session";
import { getRequestEvent } from "$app/server";
import { user } from "../db/schemas/users";
import { eq } from "drizzle-orm";

export async function registerUser(username: string, password: string) {
	const event = getRequestEvent();
	if (!validateUsername(username)) throw new Error("Invalid username");
	if (!validatePassword(password)) throw new Error("Invalid password");

	const userId = generateUserId();
	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	try {
		await db.insert(user).values({ id: userId, username, passwordHash });

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, userId);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} catch (e) {
		console.error(e);
		throw new Error("Error on registering user");
	}
}

export async function loginUser(username: string, password: string) {
	const event = getRequestEvent();
	if (!validateUsername(username))
		throw new Error(
			"Invalid username (min 3, max 31 characters, alphanumeric only)",
		);
	if (!validatePassword(password))
		throw new Error("Invalid password (min 6, max 255 characters)");

	const results = await db
		.select()
		.from(user)
		.where(eq(user.username, username));

	const existingUser = results.at(0);
	if (!existingUser) {
		return fail(400, { message: "Incorrect username or password" });
	}

	const validPassword = await verify(existingUser.passwordHash, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});
	if (!validPassword) {
		return fail(400, { message: "Incorrect username or password" });
	}

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, existingUser.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);
}

export function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

export function validateUsername(username: unknown): username is string {
	return (
		typeof username === "string" &&
		username.length >= 3 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

export function validatePassword(password: unknown): password is string {
	return (
		typeof password === "string" &&
		password.length >= 6 &&
		password.length <= 255
	);
}
