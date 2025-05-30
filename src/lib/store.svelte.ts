import { demoData } from './_demo';
import type { Inbox } from './inbox-schema';

export const user = $state({
	name: demoData.user.name,
	email: demoData.user.email,
	avatar: demoData.user.avatar
});

type ColumnData = Array<Partial<Mail>[]>;
export class Mail {
	inboxList = $state<Inbox[]>([]);
	columns = $state(3);
	db = $state({
		cursor: 0
	});

	columnsData = $derived.by<Array<ColumnData[]>>(() => {
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

	init(inbox: Inbox[]) {
		this.inboxList = inbox;
		this.db.cursor = inbox.length;
	}
}

export const mails = new Mail();
