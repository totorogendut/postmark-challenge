import { desc, eq, type SQL } from "drizzle-orm";
import { db } from "./db";
import { mail, mailCategoryView } from "./db/schemas/inbox";

export const getMailCategories = async (userId: string) =>
	db
		.select()
		.from(mailCategoryView)
		.where(eq(mailCategoryView.user, userId))
		.limit(1);

interface MailQueryOpts {
	limit?: number;
	orderBy?: SQL<unknown>;
}

export const getMailInbox = async (
	userId: string,
	opts?: Partial<MailQueryOpts>,
) => {
	return db
		.select()
		.from(mail)
		.where(eq(mail.mailToUser, userId))
		.orderBy(opts?.orderBy || desc(mail.createdAt))
		.limit(opts?.limit || 10);
};
