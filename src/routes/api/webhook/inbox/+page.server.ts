import type { RequestHandler } from "./$types";

export const GET = (async ({ url }): Promise<Response> => {
	return new Response("");
}) satisfies RequestHandler;
