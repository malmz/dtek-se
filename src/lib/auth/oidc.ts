import * as oauth from '@panva/oauth4webapi';
import type { TokenState } from './api';

const issuer = new URL(import.meta.env.VITE_AUTH_URL);
const redirect_uri = import.meta.env.VITE_AUTH_REDIRECT_URI;

const client: oauth.Client = {
	client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
	client_secret: import.meta.env.VITE_AUTH_CLIENT_SECRET
};

async function getAuthServer(): Promise<oauth.AuthorizationServer> {
	const resp = await oauth.discoveryRequest(issuer);
	const as = await oauth.processDiscoveryResponse(issuer, resp);
	return as;
}

export async function getSignInUrl(): Promise<{
	code_verifier: string;
	state: string;
	url: string;
}> {
	const as = await getAuthServer();

	const code_verifier = oauth.generateRandomCodeVerifier();
	const state = oauth.generateRandomState();
	const code_challenge = await oauth.calculatePKCECodeChallenge(code_verifier);
	const code_challenge_method = 'S256';

	const url = new URL(as.authorization_endpoint ?? '');
	url.searchParams.set('client_id', client.client_id);
	url.searchParams.set('code_challenge', code_challenge);
	url.searchParams.set('code_challenge_method', code_challenge_method);
	url.searchParams.set('redirect_uri', redirect_uri);
	url.searchParams.set('state', state);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('scope', 'openid offline_access profile');

	console.log('requesting signin', {
		code_verifier,
		state
	});

	return { url: url.toString(), code_verifier, state };
}

export async function handleSignIn(
	currentUrl: URL,
	code_verifier: string,
	state: string
): Promise<TokenState> {
	const as = await getAuthServer();

	console.log('signin callback', {
		code_verifier,
		state
	});

	const params = oauth.validateAuthResponse(as, client, currentUrl, state);

	if (oauth.isOAuth2Error(params)) {
		throw new Error(params.error_description);
	}

	const resp = await oauth.authorizationCodeGrantRequest(
		as,
		client,
		params,
		redirect_uri,
		code_verifier
	);

	if (oauth.parseWwwAuthenticateChallenges(resp)) {
		throw new Error('Invalid credentials');
	}

	const result = await oauth.processAuthorizationCodeOpenIDResponse(
		as,
		client,
		resp
	);
	if (oauth.isOAuth2Error(result)) {
		throw new Error(result.error_description);
	}

	const id_token = oauth.getValidatedIdTokenClaims(result);
	const { access_token, refresh_token, expires_in } = result;

	return {
		accessToken: access_token,
		refreshToken: refresh_token,
		idToken: id_token as any,
		expiresAt: new Date(expires_in ?? 0 + Date.now())
	};
}

export async function refreshTokens(
	refresh_token: string
): Promise<TokenState> {
	const as = await getAuthServer();
	const resp = await oauth.refreshTokenGrantRequest(as, client, refresh_token);

	if (oauth.parseWwwAuthenticateChallenges(resp)) {
		throw new Error('Invalid credentials');
	}

	const result = await oauth.processRefreshTokenResponse(as, client, resp);
	if (oauth.isOAuth2Error(result)) {
		throw new Error(result.error_description);
	}

	const id_token = oauth.getValidatedIdTokenClaims(result);

	if (!id_token) {
		throw new Error("Couldn't get id_token");
	}

	const { access_token, refresh_token: rf_token, expires_in } = result;

	return {
		accessToken: access_token,
		refreshToken: rf_token,
		idToken: id_token as any,
		expiresAt: new Date(expires_in ?? 0 + Date.now())
	};
}

export async function getUser(
	tokens: TokenState
): Promise<oauth.UserInfoResponse> {
	const as = await getAuthServer();
	const resp = await oauth.userInfoRequest(as, client, tokens.accessToken);

	if (oauth.parseWwwAuthenticateChallenges(resp)) {
		throw new Error('Invalid credentials');
	}

	const result = await oauth.processUserInfoResponse(
		as,
		client,
		tokens.idToken.sub,
		resp
	);
	return result;
}
