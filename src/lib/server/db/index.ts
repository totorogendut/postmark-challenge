import { drizzle } from "drizzle-orm/libsql";
import * as usersSchema from "./schemas/users";
import * as mailsSchema from "./schemas/inbox";
import { env } from "$env/dynamic/private";
import { createClient } from "@libsql/client";

const client = createClient({
	url: env.DATABASE_URL,
	authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle({
	schema: { ...usersSchema, ...mailsSchema },
	client,
});
