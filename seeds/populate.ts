import { allCategories } from "../src/lib/_consts";
import { demoInbox } from "../src/lib/_demo";
import { mail } from "../src/lib/server/db/schemas/inbox";
import { users as userSchema } from "../src/lib/server/db/schemas/users";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as usersSchema from "../src/lib/server/db/schemas/users";
import * as mailsSchema from "../src/lib/server/db/schemas/inbox";
import "dotenv/config";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

const client = new Database(process.env.DATABASE_URL);

export const db = drizzle(client, {
	schema: { ...usersSchema, ...mailsSchema },
});

const [user] = await db.select().from(userSchema).limit(1);
const userEmail = "jonnnnnnnn@gmail.com";

if (!user) {
	console.log("No user registered in database");
	process.exit();
}
for (const inbox of demoInbox) {
	await db.insert(mail).values({
		...inbox,
		sentiment: Math.floor(Math.random() * 201) - 100,
		mailTo: userEmail,
		mailToUser: user.id,
	});
}
