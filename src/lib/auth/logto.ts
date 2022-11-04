import {
	decodeIdToken,
	discoveryPath,
	fetchOidcConfig,
	fetchTokenByAuthorizationCode,
	fetchTokenByRefreshToken,
	generateSignInUri,
	generateSignOutUri,
	verifyAndParseCodeFromCallbackUri,
	type OidcConfigResponse
} from '@logto/js';
import crypto from 'crypto';
import { fromUint8Array } from 'js-base64';
import type { TokenState } from './api';

const client = {
	endpoint: import.meta.env.VITE_AUTH_URL,
	clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
	clientSecret: import.meta.env.VITE_AUTH_CLIENT_SECRET,
	redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI
};

async function requester<T>(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<T> {
	const resp = await fetch(input, {
		...init,
		headers: {
			...init?.headers,
			authorization: `Basic ${Buffer.from(
				`${client.clientId}:${client.clientSecret}`,
				'utf8'
			).toString('base64')}`
		}
	});

	return resp.json();
}

function generateRandomString(length = 64): string {
	return fromUint8Array(crypto.randomFillSync(new Uint8Array(length)), true);
}

function generateState(): string {
	return generateRandomString();
}

function generateCodeVerifier(): string {
	return generateRandomString();
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
	const encodedCodeVerifier = new TextEncoder().encode(codeVerifier);
	const hash = crypto.createHash('sha256');
	hash.update(encodedCodeVerifier);
	const codeChallenge = hash.digest();
	return fromUint8Array(codeChallenge, true);
}

function getOidcConfig(): Promise<OidcConfigResponse> {
	return fetchOidcConfig(
		new URL(discoveryPath, client.endpoint).toString(),
		requester
	);
}

export async function getSignInUrl(): Promise<{
	codeVerifier: string;
	state: string;
	signInUrl: string;
}> {
	const config = await getOidcConfig();
	const codeVerifier = generateCodeVerifier();
	const codeChallenge = await generateCodeChallenge(codeVerifier);
	const state = generateState();

	const signInUrl = generateSignInUri({
		authorizationEndpoint: config.authorizationEndpoint,
		clientId: client.clientId,
		redirectUri: client.redirectUri,
		codeChallenge,
		state
	});

	return { signInUrl, codeVerifier, state };
}

export async function handleSignIn(
	currentUrl: URL,
	codeVerifier: string,
	state: string
): Promise<TokenState> {
	const code = verifyAndParseCodeFromCallbackUri(
		currentUrl.toString(),
		client.redirectUri,
		state
	);
	const config = await getOidcConfig();
	const codeTokenResponse = await fetchTokenByAuthorizationCode(
		{
			clientId: client.clientId,
			code,
			codeVerifier,
			redirectUri: client.redirectUri,
			tokenEndpoint: config.tokenEndpoint
		},
		requester
	);

	return {
		accessToken: codeTokenResponse.accessToken,
		refreshToken: codeTokenResponse.refreshToken,
		idToken: decodeIdToken(codeTokenResponse.idToken),
		expiresAt: new Date(codeTokenResponse.expiresIn + Date.now())
	};
}

export async function refreshTokens(refreshToken: string): Promise<TokenState> {
	const config = await getOidcConfig();
	const codeTokenResponse = await fetchTokenByRefreshToken(
		{
			clientId: client.clientId,
			refreshToken,
			tokenEndpoint: config.tokenEndpoint
		},
		requester
	);

	return {
		accessToken: codeTokenResponse.accessToken,
		refreshToken: codeTokenResponse.refreshToken,
		idToken: decodeIdToken(codeTokenResponse.idToken ?? ''),
		expiresAt: new Date(codeTokenResponse.expiresIn + Date.now())
	};
}

export async function getSignOutUrl(tokens: TokenState): Promise<string> {
	const config = await getOidcConfig();

	const signOutUrl = generateSignOutUri({
		endSessionEndpoint: config.endSessionEndpoint,
		idToken: tokens.accessToken,
		postLogoutRedirectUri: client.redirectUri
	});

	return signOutUrl;
}

export async function getUser(tokens: TokenState): Promise<any> {
	const url = `${client.endpoint}/api/me`;
	console.log('url', url);

	const resp = await fetch(`${client.endpoint}/api/users/me`, {
		headers: {
			authorization: `Bearer ${tokens.accessToken}`
		}
	});
	return resp.text();
}
