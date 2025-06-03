import { and, Column, SQL, sql } from "drizzle-orm";
import { mail } from "../schemas/inbox";
import type { SQLiteText } from "drizzle-orm/sqlite-core";

export function arrayContains(arrayColumn: Column, arr2: any[]) {
	return and(
		...arr2.map(
			(item) =>
				sql`EXISTS (
          SELECT 1 FROM json_each(${arrayColumn})
          WHERE json_each.value = ${item}
        )`,
		),
	) as SQL;
}
