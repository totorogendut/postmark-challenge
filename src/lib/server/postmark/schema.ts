import { z } from "zod";

const emailContactSchema = z.object({
	Email: z.string().email(),
	Name: z.string(),
	MailboxHash: z.string(),
});

const headerSchema = z.object({
	Name: z.string(),
	Value: z.string(),
});

const attachmentSchema = z.object({
	Name: z.string(),
	Content: z.string(),
	ContentType: z.string(),
	ContentLength: z.number(),
});

export const postmarkWebhookSchema = z.object({
	FromName: z.string(),
	MessageStream: z.string(),
	From: z.string().email(),
	FromFull: emailContactSchema,
	To: z.string(),
	ToFull: z.array(emailContactSchema),
	Cc: z.string(),
	CcFull: z.array(emailContactSchema),
	Bcc: z.string(),
	BccFull: z.array(emailContactSchema),
	OriginalRecipient: z.string().email(),
	Subject: z.string(),
	MessageID: z.string(),
	ReplyTo: z.string().email(),
	MailboxHash: z.string(),
	Date: z.coerce.date(),
	TextBody: z.string(),
	HtmlBody: z.string(),
	StrippedTextReply: z.string(),
	Tag: z.string(),
	Headers: z.array(headerSchema),
	Attachments: z.array(attachmentSchema),
});

export type PostmarkWebhook = z.infer<typeof postmarkWebhookSchema>;
