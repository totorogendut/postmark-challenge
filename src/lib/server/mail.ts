import { asc, desc, eq } from "drizzle-orm";
import { db } from "./db";
import {
	mailCategoryView,
	mail,
	type MailCategoryView,
} from "./db/schemas/inbox";
import type { RunResult } from "better-sqlite3";
import type { Inbox } from "$lib/inbox-schema";

export async function getInbox(userId: string) {
	const inboxQ = db
		.select()
		.from(mail)
		.where(eq(mail.mailTo, userId))
		.orderBy(desc(mail.createdAt))
		.limit(10);

	const categoryQ = db
		.select()
		.from(mailCategoryView)
		.where(eq(mailCategoryView.user, userId))
		.limit(1);

	return Promise.all([inboxQ.run(), categoryQ.run()]);
}
