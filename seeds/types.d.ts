type Category =
	| "sponsorship"
	| "advertisement"
	| "promotion"
	| "collaboration"
	| "relaxed"
	| "formal"
	| "humorous"
	| "angry"
	| "sad"
	| "polite"
	| "individual"
	| "organization"
	| "government";

interface Mail {
	subject: string; // email subject
	textBody: string; // content of the email
	summary: string; // A short explanatory summary of the textBody
	// between 50~120 characters
	mailFrom: string; // email address of sender
	mailFromName?: string; // name of email sender
	categories?: Category[];
}
