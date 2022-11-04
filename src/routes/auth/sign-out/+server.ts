import { getSignInUrl } from '$lib/auth/api';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	const returnTo = url.searchParams.get('returnTo') ?? '/';
	const { signInUrl, codeVerifier, state } = await getSignInUrl();

	console.log('yes', {
		codeVerifier,
		state
	});

	await locals.session.update((session) => ({
		...session,
		signin: { codeVerifier, returnTo, state }
	}));

	throw redirect(303, signInUrl);
};
