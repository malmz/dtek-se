export async function req<T>(
	method: string,
	resource: string,
	params?: Record<string, string>,
	data?: Record<string, unknown>
): Promise<T> {
	const q = params != null ? `?${new URLSearchParams(params)}` : '';
	const u = `${import.meta.env.VITE_API_URL}${resource}${q}`;

	const resp = await fetch(u, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});
	const respData = await resp.json();
	if (respData.error != null) {
		console.error(respData.message, respData.error);

		throw new Error(respData.message);
	}
	return respData;
}
