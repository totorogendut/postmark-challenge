import { expect, test } from "vitest";
import { getRandomLLM } from ".";
import { inboxSchema } from "$lib/inbox-schema";
import { generateObject } from "ai";
import webhookExample from "../postmark/webhook-example.json";

test("genereate valid structured output objects", async () => {
	expect(async () => {
		const { object } = await generateObject({
			model: getRandomLLM({ structuredOutputs: true }),
			schemaName: "Email inbox parsing",
			schemaDescription: `Parsing an incoming email by giving it summary
			and categorized them by categories provided by schema.`,
			schema: inboxSchema,
			prompt: `Generate a JSON output based on provided schema and
		body text of an email.
		The content of the email is: ${webhookExample.TextBody}`,
		});

		console.log(object);

		inboxSchema.parse(object);
	}).not.toThrow();
});
