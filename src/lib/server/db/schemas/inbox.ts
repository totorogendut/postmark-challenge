import { allCategories, type categories } from "../../../_consts";
import {
	integer,
	sqliteTable,
	sqliteView,
	text,
} from "drizzle-orm/sqlite-core";
import { BASE_TABLE } from "./_shared";
import { nanoid } from "nanoid";
import { user } from "./users";
import { relations, sql } from "drizzle-orm";

interface MailCategory {
	business: Array<typeof categories.business>;
	tone: Array<typeof categories.tone>;
	senderIdentity: Array<typeof categories.senderIdentity>;
}

export const mail = sqliteTable(
	"mail",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => nanoid()),
		summary: text("summarry"),
		subject: text("subject"),
		textBody: text("text_body"),
		categories: text("categories", { mode: "json" }).$type<MailCategory>(),
		sentiment: integer("sentiment"),
		mailFrom: text("mail_from"),
		mailFromName: text("mail_from_name"),
		mailTo: text("mail_to").references(() => user.id),
		...BASE_TABLE,
	},
	() => [],
);

export const mailRelations = relations(mail, ({ one }) => ({
	mailTo: one(user, { fields: [mail.mailTo], references: [user.id] }),
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
	mail.mail_to AS user,
  ${allCategories.map(countSql).join(",\n")}
FROM mail, json_each(mail.categories)
WHERE value IN (${allCategories.map((c) => `'${c}'`).join(", ")})
GROUP BY mail.mail_to`);

export const mailCategoryView = sqliteView(
	"inbox_category_view",
	mailViewColumns,
).as(viewSql);

export type Mail = typeof mail.$inferSelect;
export type MailCategoryView = typeof mailCategoryView.$inferSelect;
