import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import PocketBase from 'pocketbase';
import { handleSession } from 'svelte-kit-cookie-session';

/* export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pocketbase = new PocketBase('https://pocketbase.codegrotto.dev');

	// load the store data from the request cookie string
	event.locals.pocketbase.authStore.loadFromCookie(
		event.request.headers.get('cookie') || ''
	);

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.set(
		'set-cookie',
		event.locals.pocketbase.authStore.exportToCookie()
	);

	return response;
}; */

export const handle: Handle = sequence(
	handleSession({
		rolling: true,
		key: 'auth',
		secret: import.meta.env.VITE_SESSION_SECRET
	})
);

/* export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userid = cookies['userid'] || crypto.randomUUID();

	const response = await resolve(event);

	if (!cookies['userid']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
}; */
