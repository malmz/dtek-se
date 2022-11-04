import type { SigninState, TokenState } from '$lib/auth/api';
import type { Handle } from '@sveltejs/kit';
import type { Session } from 'svelte-kit-cookie-session';

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

interface AuthState {
	signinState?: {
		codeVerifier: string;
		returnTo: string;
		state: string;
	};
	accessToken?: string;
	refreshToken?: string;
	idToken?: string;
}

interface OidcClient {
	verifyTokenClaims: (token: string) => Promise<Record<string, unknown>>;
}

class AuthStore {
	sessionState: AuthState = {};

	load(session: Session) {
		this.sessionState = session.data.authState;
	}

	async store(session: Session) {
		await session.update((session) => ({
			...session,
			authState: this.sessionState
		}));
	}
}

type GetInit = Omit<RequestInit, 'method' | 'body'> & {
	params?: Record<string, string | string[] | undefined>;
	body?: unknown;
};

class Fetcher {
	#baseUrl: string;
	#fetch: typeof globalThis.fetch;

	auth: AuthStore;

	constructor(baseUrl: string, fetch: typeof globalThis.fetch) {
		this.#baseUrl = baseUrl;
		this.#fetch = fetch;
		this.auth = new AuthStore();
	}

	async get<T>(url: string, init: GetInit): Promise<T> {
		const resp = await this.#fetch(
			`${this.#baseUrl}${url}${createParams(init.params)}`,
			{
				...init,
				body: init.body ? JSON.stringify(init.body) : undefined,
				method: 'GET'
			}
		);
		if (!resp.ok) {
			throw new Error(`Failed to fetch ${url}`);
		}
		return await resp.json();
	}
}

export interface DtekClientOptions {
	fetch?: typeof globalThis.fetch;
}

export class DtekClient {
	fetcher: Fetcher;

	constructor(baseUrl: string, options: DtekClientOptions) {
		this.fetcher = new Fetcher(baseUrl, options.fetch ?? globalThis.fetch);
	}
}

export class AuthClient {}

export function handleSession(
	baseUrl: string,
	options: DtekClientOptions
): Handle {
	const client = new DtekClient(baseUrl, options);
	return async ({ event, resolve }) => {
		client.fetcher.auth.load(event.locals.session);
		event.locals.dtek = client;
		const response = await resolve(event);
		await client.fetcher.auth.store(event.locals.session);
		return response;
	};
}
