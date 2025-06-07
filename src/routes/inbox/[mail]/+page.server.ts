import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { mail } from "$lib/server/db/schemas/inbox";
import { eq } from "drizzle-orm";

export const load = (async ({ locals, params }) => {
	const mailId = params.mail;

	const [result] = await db.select().from(mail).where(eq(mail.id, mailId)).limit(1);

	if (!result) return fail(404, { messages: "Email not found" });

	if (!result.hasRead) {
		db.update(mail).set({ hasRead: true }).where(eq(mail.id, mailId)).limit(1);
	}

	return {
		mail: result,
	};
}) satisfies PageServerLoad;
