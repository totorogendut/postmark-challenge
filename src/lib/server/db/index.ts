import { drizzle } from "drizzle-orm/libsql";
import * as usersSchema from "./schemas/users";
import * as mailsSchema from "./schemas/inbox";
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "$env/static/private";
import { createClient } from "@libsql/client";

const client = createClient({
	url: DATABASE_URL,
	authToken: DATABASE_AUTH_TOKEN,
});

export const db = drizzle({
	schema: { ...usersSchema, ...mailsSchema },
	client,
});
