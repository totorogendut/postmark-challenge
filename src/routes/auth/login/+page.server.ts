import { hash, verify } from "@node-rs/argon2";
import { encodeBase32LowerCase } from "@oslojs/encoding";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schemas/users";
import type { Actions, PageServerLoad } from "./$types";
import { loginUser, registerUser } from "$lib/server/auth/user";
import { setSessionTokenCookie } from "$lib/server/auth/session";

export const load: PageServerLoad = async ({ locals, request }) => {
	// if (locals.user) {
	// 	return redirect(302, "/");
	// }
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		try {
			const { avatar, id, email } = await loginUser(username, password);
			return {
				user: {
					username,
					id,
					avatar: avatar || "",
					email: email || "",
				},
			};
		} catch (error) {
			console.error(error);
			if (error instanceof Error) return fail(500, { message: error.message });
			return fail(500, { message: "Unknown error" });
		}
	},
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		try {
			const { avatar, id, email } = await registerUser(username, password);
			return {
				user: {
					username,
					id,
					avatar: avatar || "",
					email: email || "",
				},
			};
		} catch (error) {
			console.error(error);
			if (error instanceof Error) return fail(500, { message: error.message });
			return fail(500, { message: "Unknown error" });
		}
	},
};
