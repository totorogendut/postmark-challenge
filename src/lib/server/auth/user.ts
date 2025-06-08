import { encodeBase32LowerCase } from "@oslojs/encoding";
import { fail } from "@sveltejs/kit";
// import { hash, verify } from "@node-rs/argon2";
import { db } from "../db";
import { createSession, generateSessionToken, setSessionTokenCookie } from "./session";
import { getRequestEvent } from "$app/server";
import { users } from "../db/schemas/users";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "./_shared";

export async function registerUser(username: string, password: string) {
	const event = getRequestEvent();
	if (!validateUsername(username))
		throw new Error("Invalid username! Use lowercase, digits, -, and _.");
	if (!validatePassword(password)) throw new Error("Invalid password. Min 6 characters.");

	const userId = generateUserId();
	// const passwordHash = await hash(password, {
	// 	// recommended minimum parameters
	// 	memoryCost: 19456,
	// 	timeCost: 2,
	// 	outputLen: 32,
	// 	parallelism: 1,
	// });
	const passwordHash = await hashPassword(password);

	try {
		const [user] = await db
			.insert(users)
			.values({ id: userId, username, passwordHash })
			.returning();

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, userId);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return user;
	} catch (e) {
		throw new Error("Error on registering user");
	}
}

export async function loginUser(username: string, password: string) {
	const event = getRequestEvent();
	if (!validateUsername(username))
		throw new Error("Invalid username (min 3, max 31 characters, alphanumeric only)");
	if (!validatePassword(password)) throw new Error("Invalid password (min 6, max 255 characters)");

	const [user] = await db.select().from(users).where(eq(users.username, username));

	if (!user) {
		throw new Error("Incorrect username or password");
	}

	// const validPassword = await verify(user.passwordHash, password, {
	// 	memoryCost: 19456,
	// 	timeCost: 2,
	// 	outputLen: 32,
	// 	parallelism: 1,
	// });
	const validPassword = await verifyPassword(password, user.passwordHash);
	if (!validPassword) {
		throw new Error("Incorrect username or password");
	}

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return user;
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
	return typeof password === "string" && password.length >= 6 && password.length <= 255;
}
