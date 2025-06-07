import { demoData } from "./_demo";
import type { Inbox } from "./inbox-schema";
import type { Mail as MailSchema } from "$lib/server/db/schemas/inbox";
import type { User as UserSchema } from "$lib/server/db/schemas/users";
import { SvelteSet } from "svelte/reactivity";
import { defaultInboxQuery, type allCategories } from "./_consts";
import { postAction } from "./actions";
import { untrack } from "svelte";
import { minidenticon } from "minidenticons";
import { env } from "$env/dynamic/public";

class User {
	data = $state({
		id: "",
		username: "",
		email: "",
		avatar: "",
	});

	inboundEmailAddress = $derived(
		(env.PUBLIC_POSTMARK_INBOUND_EMAIL_ADDRESS || "").split("@").join(`+${this.data?.id}@`),
	);

	avatarURL = $derived(
		this.data?.avatar ||
			"data:image/svg+xml;utf8," + encodeURIComponent(minidenticon(this.data?.id)),
	);
}

type ColumnData = MailSchema[];
interface MailState {
	onlyUnread: boolean;
	orderBy: "createdAt" | "sentiment";
	maxFraudIndicator: number;
	maxSpamIndicator: number;
}
class Mail {
	inboxList = $state<MailSchema[]>([]);
	columns = $state(3);
	queryOpts = $state(defaultInboxQuery);
	selectedCategories = new SvelteSet();
	loading = $state(false);
	state = $state<MailState>({
		onlyUnread: false,
		orderBy: "createdAt",
		maxFraudIndicator: 25,
		maxSpamIndicator: 25,
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

	insert(inbox: MailSchema[]) {
		this.inboxList.push(...inbox);
		this.queryOpts.offset += inbox.length;
	}

	toggleCategory(category: (typeof allCategories)[number]) {
		if (this.selectedCategories.has(category)) {
			this.selectedCategories.delete(category);
		} else {
			this.selectedCategories.add(category);
		}

		this.reset();
		this.get();
	}

	reset() {
		this.inboxList = [];
		this.queryOpts = defaultInboxQuery;
	}

	async get() {
		this.loading = true;
		try {
			const res = await postAction("/api/inbox/", {
				...this.queryOpts,
				...this.state,
				...(this.state.onlyUnread ? { hasRead: false } : {}),
				categories: Array.from(this.selectedCategories),
			});

			if (!res.ok) return;
			const json = await res.json();
			if (!json[0]?.createdAt) throw new Error("failed decoding json on inbox fetch");
			untrack(() => {
				this.insert(json as MailSchema[]);
			});
		} catch (error) {
			console.error(error);
		} finally {
			this.loading = false;
		}
	}
}

export const mails = new Mail();
export const user = new User();
