export type FetchFunction = (
	info: RequestInfo,
	init?: RequestInit
) => Promise<Response>;

function createParams(
	params?: Record<string, string | string[] | undefined>
): string {
	if (params) {
		const p = new URLSearchParams();
		for (const [key, value] of Object.entries(params)) {
			if (Array.isArray(value)) {
				for (const v of value) {
					p.append(key, v);
				}
			} else {
				value && p.append(key, value);
			}
		}
		return '?' + p.toString();
	} else {
		return '';
	}
}

interface ReqProps {
	method: string;
	url: string;
	params?: Record<string, string | string[] | undefined>;
	headers?: Record<string, string>;
	body?: unknown;
	fetch?: FetchFunction;
}

export interface ApiResponse<T> {
	status: number;
	props?: T;
	error?: Error;
}

export async function req<T>({
	method,
	url,
	params,
	headers,
	body,
	fetch
}: ReqProps): Promise<T> {
	const u = `${import.meta.env.VITE_API_URL}${url}${createParams(params)}`;

	const f = fetch ?? globalThis.fetch;

	const resp = await f(u, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers
		},
		body: body ? JSON.stringify(body) : undefined
	});

	if (resp.ok) {
		try {
			return await resp.json();
		} catch (error) {
			throw {
				status: resp.status,
				error: new Error(`Failed to parse json response from ${url}`)
			};
		}
	} else {
		let exep: {
			status: number;
			error: Error;
		};
		try {
			const error = await resp.json();
			exep = {
				status: resp.status,
				error: new Error(`Failed to ${method} ${url}`, {
					cause: new Error(error.message)
				})
			};
		} catch (error) {
			exep = {
				status: resp.status,
				error: new Error(`Failed to ${method} ${url}`)
			};
		}
		throw exep;
	}
}
