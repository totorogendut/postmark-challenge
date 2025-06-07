import { allCategories, type categories } from "../../../_consts";
import { index, integer, sqliteTable, sqliteView, text } from "drizzle-orm/sqlite-core";
import { BASE_TABLE } from "./_shared";
import { nanoid } from "nanoid";
import { users } from "./users";
import { relations, sql } from "drizzle-orm";

export type MailCategory = (typeof allCategories)[number][];

export const mail = sqliteTable(
	"mail",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => nanoid()),
		summary: text("summarry"),
		subject: text("subject"),
		textBody: text("text_body"),
		hasRead: integer("has_read", { mode: "boolean" }).$default(() => false),
		categories: text("categories", { mode: "json" }).$type<MailCategory>(),
		sentiment: integer("sentiment"),
		mailFrom: text("mail_from").notNull(),
		mailFromName: text("mail_from_name"),
		mailTo: text("mail_to").notNull(),
		mailToUser: text("mail_to_user").references(() => users.id),
		...BASE_TABLE,
	},
	(t) => [
		index("mail_to_idc").on(t.mailToUser),
		index("created_at_idx").on(t.createdAt),
		index("sentiment_idx").on(t.sentiment),
		index("categories_idx").on(t.categories),
	],
);

export const mailRelations = relations(mail, ({ one }) => ({
	mailToUser: one(users, { fields: [mail.mailToUser], references: [users.id] }),
}));

const mailViewColumns = {
	user: text("user"),
	...allCategories.reduce(
		(obj, category) => {
			obj[category] = integer(`${category}_count`).notNull();
			return obj;
		},
		{} as Record<string, ReturnType<typeof integer>>,
	),
};

const countSql = (category: string) =>
	`CAST(COUNT(DISTINCT CASE WHEN value = '${category}' THEN mail.id END) AS INTEGER) AS ${category}_count`;

const viewSql = sql.raw(`SELECT
	mail.mail_to_user AS user,
  ${allCategories.map(countSql).join(",\n")}
FROM mail, json_each(mail.categories)
WHERE value IN (${allCategories.map((c) => `'${c}'`).join(", ")})
GROUP BY mail.mail_to`);

export const mailCategoryView = sqliteView("inbox_category_view", mailViewColumns).as(viewSql);

export type Mail = typeof mail.$inferSelect;
export type MailCategoryView = typeof mailCategoryView.$inferSelect & {
	[key: string]: number;
};
