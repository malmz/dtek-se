import { handleSignIn } from '$lib/auth/api';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	if (!locals.session.data.signin) {
		throw error(400, 'No signin session');
	}

	const { codeVerifier, returnTo, state } = locals.session.data.signin;

	console.log('callback', {
		codeVerifier,
		state,
		returnTo
	});

	const tokens = await handleSignIn(url, codeVerifier, state);

	await locals.session.update((val) => ({
		...val,
		tokens,
		signin: undefined
	}));

	throw redirect(303, returnTo);
};
