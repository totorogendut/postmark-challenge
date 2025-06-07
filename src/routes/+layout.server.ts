import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {
	if (!locals.user && !url.pathname.startsWith("/auth/login")) return redirect(302, "/auth/login");
	if (!locals.user?.email && !!locals.user && !url.pathname.startsWith("/settings"))
		return redirect(302, "/settings");

	return {
		user: locals.user,
	};
}) satisfies LayoutServerLoad;
