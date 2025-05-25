import { db } from "../db";
import { mail } from "../db/schemas/inbox";
import type { PostmarkWebhook } from "./schema";
import example from "./webhook-example.json";

export async function createInboxData(webhookData: PostmarkWebhook) {
	db.insert(mail).values({
		mailFrom: webhookData.From,
		mailFromName: webhookData.FromName,
	});
}
