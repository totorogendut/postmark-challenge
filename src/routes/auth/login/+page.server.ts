import { hash, verify } from "@node-rs/argon2";
import { encodeBase32LowerCase } from "@oslojs/encoding";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schemas/users";
import type { Actions, PageServerLoad } from "./$types";
import { loginUser, registerUser } from "$lib/server/auth/user";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		return redirect(302, "/");
	}
	return {};
};

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		try {
			await loginUser(username, password);
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, { message: error.message });
			}

			return fail(500, { message: "Unknown error" });
		}

		return redirect(302, "/");
	},
	register: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		try {
			await registerUser(username, password);
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, { message: error.message });
			}

			return fail(500, { message: "Unknown error" });
		}

		return redirect(302, "/");
	},
};
