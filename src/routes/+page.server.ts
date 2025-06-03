import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getMailCategories, getMailInbox } from "$lib/server/queries";
import type { MailCategoryView } from "$lib/server/db/schemas/inbox";

export const load = (async ({ locals, url }) => {
	if (!locals.user) return;
	const mailQueryOpts = {
		offset: Number.parseInt(url.searchParams.get("mailoffset") || "0"),
		limit: Number.parseInt(url.searchParams.get("maillimit") || "10"),
		hasRead:
			url.searchParams.get("mailhasread") === "1"
				? true
				: url.searchParams.get("mailhasread") === "0"
					? false
					: undefined,
	};

	const categoriesQ = getMailCategories(locals.user.id) as Promise<MailCategoryView[]>;
	const inboxQ = getMailInbox(mailQueryOpts);

	const [[categories], inbox] = await Promise.all([categoriesQ, inboxQ]);

	return {
		inbox,
		categories,
	};
}) satisfies PageServerLoad;
