import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schemas/users";
import { eq } from "drizzle-orm";
import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {
	if (!locals.user) return;

	return {
		email: locals.user.email,
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user?.id) return;
		// TODO log the user in
		const data = await request.formData();
		const email = data.get("email") as string;

		await db.update(users).set({ email }).where(eq(users.id, locals.user.id));
	},
} satisfies Actions;
