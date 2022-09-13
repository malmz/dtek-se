import { Configuration, V0alpha2Api } from '@ory/kratos-client';

export const authUrl = import.meta.env.VITE_AUTH_URL ?? '';

export function getFlowInitUrl(type: string, query: URLSearchParams): string {
	const queryString = query ? '?' + query.toString() : '';
	return `${authUrl}self-service/${type}/browser${queryString}`;
}

export const authApi = new V0alpha2Api(
	new Configuration({
		basePath: import.meta.env.VITE_AUTH_URL
	})
);
