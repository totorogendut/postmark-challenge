import { demoData } from './_demo';
import type { Inbox } from './inbox-schema';
import type { Mail as MailSchema } from '$lib/server/db/schemas/inbox';
import type { User as UserSchema } from '$lib/server/db/schemas/users';

class User {
	name = $state(demoData.user.name);
	email = $state(demoData.user.email);
	avatar = $state(demoData.user.avatar);
	inboxHash = $state('');

	constructor(opts?: Partial<UserSchema>) {
		if (opts?.username) this.name = opts.username;
		if (opts?.email) this.email = opts.email;
		if (opts?.avatar) this.avatar = opts.avatar;
		if (opts?.inboxHash) this.inboxHash = opts.inboxHash;
	}
}

type ColumnData = MailSchema[];
class Mail {
	inboxList = $state<MailSchema[]>([]);
	columns = $state(3);
	db = $state({
		cursor: 0
	});

	columnsData = $derived.by(() => {
		const columnGroup: Array<ColumnData> = [];
		const columnHeight: number[] = Array(this.columns).fill(0);
		if (!this.inboxList?.length) return columnGroup;

		for (const mail of this.inboxList) {
			const idx = columnHeight.indexOf(Math.min(...columnHeight));
			if (!columnGroup[idx]) columnGroup[idx] = [];
			columnGroup[idx].push(mail);
			columnHeight[idx] += mail.summary?.length || 0;
		}

		return columnGroup;
	});

	init(inbox: MailSchema[]) {
		this.inboxList = inbox;
		this.db.cursor = inbox.length;
	}
}

export const mails = new Mail();
export const user = new User();
