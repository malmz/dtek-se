import { env } from '$env/dynamic/public';

function createParams(params?: Record<string, string | string[] | undefined>): string {
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

export async function resource<T>(
	fetch: typeof globalThis.fetch,
	url: string,
	params?: Record<string, string | string[] | undefined>,
	defaultValue?: T
): Promise<T> {
	try {
		const resp = await fetch(`${env.PUBLIC_API_URL}${url}${createParams(params)}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await resp.json();
		if (data.error) {
			throw new Error(data.message);
		}
		return data as T;
	} catch (error) {
		if (defaultValue) {
			return defaultValue;
		}
		throw error;
	}
}

export async function modify<T, U>(
	fetch: typeof globalThis.fetch,
	url: string,
	body: T
): Promise<U> {
	const resp = await fetch(`${env.PUBLIC_API_URL}${url}`, {
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	const data = await resp.json();
	if (data.error) {
		throw new Error(data.message);
	}
	return data as U;
}
