import { generateObject } from "ai";
import type { RequestHandler } from "./$types";
import { inboxSchema } from "$lib/inbox-schema";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { users as userSchema } from "$lib/server/db/schemas/users";
import { eq } from "drizzle-orm";
import {
	mail,
	mail as mailSchema,
	type Mail,
} from "$lib/server/db/schemas/inbox";
import {
	postmarkWebhookSchema,
	type PostmarkWebhook,
} from "$lib/server/postmark/schema";

const model = openai("gpt-4.1-nano", {
	structuredOutputs: true,
});

export const GET = (async (req: RequestHandler): Promise<Response> => {
	const webhook: PostmarkWebhook = await req.json();
	const textBody = webhook.TextBody;

	if (!textBody)
		return new Response("Webhook data parsing failed", {
			status: 500,
			statusText: "Failed to parse webhook data.",
		});

	const inboxHash = "12314";
	const [user] = await db
		.select()
		.from(userSchema)
		.where(eq(userSchema.inboxHash, inboxHash));

	if (!user)
		return new Response("No user found", {
			status: 403,
			statusText: "No user by that inbox has is found.",
		});

	const { object } = await generateObject({
		model,
		schemaName: "Email inbox parsing",
		schemaDescription: `Parsing an incoming email by giving it summary
			and categorized them by categories provided by schema.`,
		schema: inboxSchema,
		prompt: `Generate a JSON output based on provided schema and
		body text of an email.
		The content of the email is: ${textBody}`,
	});

	try {
		inboxSchema.parse(object);
		await db.insert(mail).values(object as Mail);
	} catch (error) {
		return new Response("Parsed object failed", {
			status: 500,
			statusText: "Invalid generated AI parsed object.",
		});
	}

	return new Response("");
}) satisfies RequestHandler;
