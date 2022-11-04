import { getUser, requireAuth } from '$lib/auth/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const tokens = await requireAuth(locals.session, url.pathname);
	const user = await getUser(tokens);
	console.log(user);

	return {
		user: {
			name: 'SvelteKit',
			avatar: ''
		}
	};

	//const user = await getUser(locals.session.data.tokens!);
	//console.log('user', user);

	/* return {
		user
	}; */
};
