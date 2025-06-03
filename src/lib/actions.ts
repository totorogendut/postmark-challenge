export const postAction = async <T>(url: `/api/${string}`, payload: T) =>
	fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(payload),
	});
