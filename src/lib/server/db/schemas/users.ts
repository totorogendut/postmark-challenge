import { sqliteTable, text, integer, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { BASE_TABLE } from "./_shared";
import { relations } from "drizzle-orm";
import { mail, mailCategoryView } from "./inbox";
import { nanoid } from "nanoid";

export const users = sqliteTable(
	"user",
	{
		id: text("id").primaryKey(),
		username: text("username").notNull().unique(),
		email: text("email").unique(),
		passwordHash: text("password_hash").notNull(),
		avatar: text("avatar"),
		mailboxHash: text("mailbox_hash"),
		...BASE_TABLE,
	},
	(table) => [uniqueIndex("name_idx").on(table.username), uniqueIndex("email_idx").on(table.email)],
);

export const userRelations = relations(users, ({ many, one }) => ({
	mails: many(mail),
}));

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export type Session = typeof session.$inferSelect;
export type User = typeof users.$inferSelect;
