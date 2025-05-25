import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getInbox } from "$lib/server/mail";

export const load = (async ({ locals }) => {
	if (!locals.user) return;
	const [inbox, category] = await getInbox(locals.user.id);

	return {
		inbox,
		category,
	};
}) satisfies PageServerLoad;
