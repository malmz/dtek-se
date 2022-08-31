import {
	fetchOidcConfig,
	discoveryPath,
	logtoRequestErrorSchema,
	LogtoError,
	LogtoRequestError,
	generateSignInUri,
	verifyAndParseCodeFromCallbackUri,
	fetchTokenByAuthorizationCode,
	fetchTokenByRefreshToken,
	type CodeTokenResponse,
	type RefreshTokenTokenResponse,
	type IdTokenClaims
} from '@logto/js';
import { fromUint8Array } from 'js-base64';

const apiUrl = import.meta.env.VITE_AUTH_URL;
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;
const clientSecret = import.meta.env.VITE_AUTH_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI;

export interface SessionData {
	signin: SigninSession;
	tokens: Omit<CodeTokenResponse, 'idToken'> & {
		idToken: IdTokenClaims;
	};
}

function generateRandomString(length = 64): string {
	return fromUint8Array(crypto.getRandomValues(new Uint8Array(length)), true);
}

function generateState(): string {
	return generateRandomString();
}

function generateCodeVerifier(): string {
	return generateRandomString();
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
	if (crypto.subtle === undefined) {
		throw new Error('crypto.subtle is not available');
	}

	const data = new TextEncoder().encode(codeVerifier);
	const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
	return fromUint8Array(hash, true);
}

async function requester<T>(
	input: RequestInfo | URL,
	init?: RequestInit
): Promise<T> {
	// TODO: node specific code, look at removing this
	const token = `Basic ${Buffer.from(
		`${clientId}:${clientSecret}`,
		'utf8'
	).toString('base64')}`;
	const response = await fetch(input, {
		...init,
		headers: {
			...init?.headers,
			authorization: token
		}
	});

	if (!response.ok) {
		const responseJson = await response.json();

		if (!logtoRequestErrorSchema.is(responseJson)) {
			throw new LogtoError('unexpected_response_error', responseJson);
		}

		// Expected request error from server
		const { code, message } = responseJson;
		throw new LogtoRequestError(code, message);
	}

	return response.json();
}

function getOidcConfig(): ReturnType<typeof fetchOidcConfig> {
	return fetchOidcConfig(`${apiUrl}${discoveryPath}`, requester);
}

export async function getSignInUrl(): Promise<{
	redirectUri: string;
	codeVerifier: string;
	state: string;
	signInUrl: string;
}> {
	const { authorizationEndpoint } = await getOidcConfig();
	const codeVerifier = generateCodeVerifier();
	const codeChallenge = await generateCodeChallenge(codeVerifier);
	const state = generateState();
	const signInUrl = generateSignInUri({
		authorizationEndpoint,
		clientId,
		redirectUri,
		codeChallenge,
		state
	});

	return { redirectUri, codeVerifier, state, signInUrl };
}

export interface SigninSession {
	redirectUri: string;
	state: string;
	codeVerifier: string;
}

export async function handleSignIn(
	session: SigninSession,
	callbackUri: string
): Promise<CodeTokenResponse> {
	const code = verifyAndParseCodeFromCallbackUri(
		callbackUri,
		session.redirectUri,
		session.state
	);
	const { tokenEndpoint } = await getOidcConfig();
	const tokenResponse = await fetchTokenByAuthorizationCode(
		{
			clientId,
			tokenEndpoint,
			redirectUri: session.redirectUri,
			codeVerifier: session.codeVerifier,
			code
		},
		requester
	);
	return tokenResponse;
}

export async function refreshTokens(
	refreshToken: string
): Promise<RefreshTokenTokenResponse> {
	const { tokenEndpoint } = await getOidcConfig();
	const tokenResponse = await fetchTokenByRefreshToken(
		{
			clientId,
			tokenEndpoint,
			refreshToken
		},
		requester
	);
	return tokenResponse;
}
