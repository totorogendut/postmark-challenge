import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async ({ url, request }): Promise<Response> => {
	const { data } = await request.json();

	return json(data);
}) satisfies RequestHandler;
