import { handleSignIn } from '$lib/auth';
import { decodeIdToken } from '@logto/js';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request, locals }) => {
	if (!locals.session.data.signin) {
		throw error(400, 'No signin session');
	}

	const url = new URL(request.url);

	const response = await handleSignIn(
		locals.session.data.signin,
		`${url.protocol}://${url.host}${url.pathname}`
	);
	locals.session.update((val) => {
		return {
			...val,
			tokens: {
				...response,
				expiresIn: response.expiresIn + Date.now(),
				idToken: decodeIdToken(response.idToken)
			},
			signin: undefined
		};
	});
	throw redirect(301, '/');
};
