import { and, desc, eq, ilike, sql, type SQL } from "drizzle-orm";
import { db } from "./db";
import { mail, mailCategoryView, type MailCategoryView } from "./db/schemas/inbox";
import { getRequestEvent } from "$app/server";
import { arrayContains } from "./db/utils";

export const getMailCategories = async (userId: string) =>
	db.select().from(mailCategoryView).where(eq(mailCategoryView.user, userId)).limit(1);

interface MailQueryOpts {
	limit?: number;
	offset?: number;
	orderBy?: string;
	hasRead?: boolean;
	categories?: string[];
}

export const getMailInbox = async (opts?: Partial<MailQueryOpts>) => {
	const { locals } = getRequestEvent();
	const conditions: SQL<unknown>[] = [eq(mail.mailToUser, locals.user.id)];
	if (opts?.hasRead !== undefined) conditions.push(eq(mail.hasRead, opts.hasRead));
	if (opts?.categories?.length && opts?.categories) {
		conditions.push(arrayContains(mail.categories, opts.categories));
	}

	const orderBy = (() => {
		switch (opts?.orderBy) {
			case "createdAt":
				return desc(mail.createdAt);
			case "sentiment":
				return desc(mail.sentiment);
			default:
				return desc(mail.createdAt);
		}
	})();

	return db
		.select()
		.from(mail)
		.where(and(...conditions))
		.orderBy(orderBy)
		.limit(opts?.limit || 10)
		.offset(opts?.offset || 0);
};
