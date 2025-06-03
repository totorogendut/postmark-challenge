import type { allCategories } from "$lib/_consts";
import { getMailInbox } from "$lib/server/queries";
import type { RequestHandler } from "./$types";

interface Props {
	offset: number;
	limit: number;
	userId: string;
	categories: typeof allCategories;
}

export const POST = (async ({ request }): Promise<Response> => {
	const { userId, ...opts }: Props = await request.json();

	const result = await getMailInbox(opts);

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: { "content-type": "application/json" },
	});
}) satisfies RequestHandler;
