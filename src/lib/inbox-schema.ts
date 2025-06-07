import { z } from "zod";
import { categories } from "./_consts";
import { SCHEMA_CONSTS } from "./_consts";

export const inboxSchema = z.object({
	summary: z.string().min(SCHEMA_CONSTS.SUMMARY.min).max(SCHEMA_CONSTS.SUMMARY.max),
	mailFrom: z.string(),
	subject: z.string(),
	textBody: z.string(),
	// createdAt: z.date(),
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
			`Sentiment value of the content of the email, ranging from
${SCHEMA_CONSTS.SENTIMENT.min} to ${SCHEMA_CONSTS.SENTIMENT.max}.

Lower value means negative sentiment such as having angry remarks, insulting
email recipient, etc. 
Polite complaints and cold emails sits somewhere in the middle. 
Frendlier emails or emails providing opportunities such as
collaboration or sponsorship have better sentiment value.`,
		),
	fraudIndicator: z
		.number()
		.min(SCHEMA_CONSTS.FRAUD_INDICATOR.min)
		.max(SCHEMA_CONSTS.FRAUD_INDICATOR.max)
		.describe(
			`Fraud indicator value of the content of the email, ranging from
${SCHEMA_CONSTS.FRAUD_INDICATOR.min} to ${SCHEMA_CONSTS.FRAUD_INDICATOR.max}.
Lower value means safe and trusted emails. 
High value means that the email is untrusted and the sender has evil
intention such as fraud, scam, fishing, blackmail, hacking, etc.`,
		),
	spamIndicator: z
		.number()
		.min(SCHEMA_CONSTS.SPAM_INDICATOR.min)
		.max(SCHEMA_CONSTS.SPAM_INDICATOR.max)
		.describe(
			`Fraud indicator value of the content of the email, ranging from
${SCHEMA_CONSTS.SPAM_INDICATOR.min} to ${SCHEMA_CONSTS.SPAM_INDICATOR.max}.
Lower value means the email is not a spam. 
High value means that the email is likely a spam.`,
		),
});

export type Inbox = z.infer<typeof inboxSchema>;
