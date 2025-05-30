import { z } from "zod";
import { categories } from "./_consts";
import { SCHEMA_CONSTS } from "./_consts";

export const inboxSchema = z.object({
	summary: z
		.string()
		.min(SCHEMA_CONSTS.SUMMARY.min)
		.max(SCHEMA_CONSTS.SUMMARY.max),
	content: z.string(),
	mailFrom: z.string(),
	subject: z.string(),
	createdAt: z.date(),
	category: z.object({
		business: z.enum(categories.business),
		tone: z.enum(categories.tone),
		senderIdentity: z.enum(categories.senderIdentity),
	}),
	sentiment: z
		.number()
		.min(SCHEMA_CONSTS.SENTIMENT.min)
		.max(SCHEMA_CONSTS.SENTIMENT.max)
		.describe(
			`Sentiment value of the content of the email.
Lower value means negative sentiment such as having angry remarks, insulting
email recipient, etc. 
Polite complaints and cold emails sits somewhere in the middle. 
Frendlier emails or emails providing opportunities such as
collaboration or sponsorship have better sentiment value.`,
		),
});

export type Inbox = z.infer<typeof inboxSchema>;
