import { demoData } from "./_demo";
import type { Inbox } from "./inbox-schema";

export const user = $state({
	name: demoData.user.name,
	email: demoData.user.email,
	avatar: demoData.user.avatar,
});

export class Mail {
	inboxList = $state<Inbox[]>();
}

export const mails = new Mail();
