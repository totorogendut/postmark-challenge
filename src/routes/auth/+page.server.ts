import * as auth from "$lib/server/auth/user";
import { fail, redirect } from "@sveltejs/kit";
import { getRequestEvent } from "$app/server";
import type { Actions, PageServerLoad } from "./$types";
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/auth/session";

export const load: PageServerLoad = async () => {
	const user = requireLogin();
	return { user };
};

export const actions: Actions = {
	logout: async (event) => {
		console.log("logging out....");
		if (!event.locals.session) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);

		return redirect(302, "/auth/login");
	},
};

function requireLogin() {
	const { locals } = getRequestEvent();
	if (!locals.user) return redirect(302, "/auth/login");
	return locals.user;
}
