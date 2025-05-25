import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { BASE_TABLE } from "./_shared";
import { relations } from "drizzle-orm";
import { mail } from "./inbox";
import { nanoid } from "nanoid";

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	avatar: text("avatar"),
	inboxHash: text("inbox_hash").$defaultFn(() => nanoid()),
	...BASE_TABLE,
});

export const userRelations = relations(user, ({ many }) => ({
	mails: many(mail),
}));

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
