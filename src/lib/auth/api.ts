import type { IdTokenClaims } from '@logto/js';

import { redirect } from '@sveltejs/kit';
import type { SessionData } from 'src/session';
import type { Session } from 'svelte-kit-cookie-session';
import { refreshTokens } from './logto';

export interface SigninState {
	codeVerifier: string;
	returnTo: string;
	state: string;
}

export interface TokenState {
	accessToken: string;
	refreshToken?: string;
	expiresAt: Date;
	idToken: IdTokenClaims;
}

export { getSignInUrl, handleSignIn, refreshTokens, getUser } from './logto';

export async function requireAuth(
	session: Session<SessionData>,
	return_to?: string
) {
	if (!session.data.tokens) {
		throw redirect(
			303,
			`/auth/sign-in${return_to ? '?return_to=' + return_to : ''}`
		);
	}

	if (
		session.data.tokens.expiresAt < new Date() &&
		session.data.tokens.refreshToken
	) {
		const state = await refreshTokens(session.data.tokens.refreshToken);
		await session.update((session) => ({ ...session, tokens: state }));
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return session.data.tokens!;
}
