import { getSignInUrl } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	const { redirectUri, codeVerifier, signInUrl, state } = await getSignInUrl();
	locals.session.update((val) => {
		return {
			...val,
			signin: { redirectUri, codeVerifier, state }
		};
	});
	throw redirect(301, signInUrl);
};
