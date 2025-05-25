import { integer } from "drizzle-orm/sqlite-core";

export const BASE_TABLE = {
	createdAt: integer("expires_at", { mode: "timestamp" }).$defaultFn(
		() => new Date(),
	),
	updatedAt: integer("expires_at", { mode: "timestamp" })
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date()),
};
