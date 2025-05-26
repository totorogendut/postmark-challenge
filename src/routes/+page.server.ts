import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getMailCategories, getMailInbox } from "$lib/server/queries";

export const load = (async ({ locals }) => {
	if (!locals.user) return;

	return {
		inbox: await getMailInbox(locals.user.id),
		categories: await getMailCategories(locals.user.id),
	};
}) satisfies PageServerLoad;
