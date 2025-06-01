import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getMailCategories, getMailInbox } from '$lib/server/queries';
import type { MailCategoryView } from '$lib/server/db/schemas/inbox';

export const load = (async ({ locals }) => {
	if (!locals.user) return;

	const [categories] = (await getMailCategories(locals.user.id)) as MailCategoryView[];
	const inbox = await getMailInbox(locals.user.id);

	return {
		inbox,
		categories
	};
}) satisfies PageServerLoad;
