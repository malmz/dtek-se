import { authApi, getFlowInitUrl } from '$lib/auth/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	try {
		const session = await authApi.toSession(
			undefined,
			request.headers.get('cookie') ?? ''
		);
		return {
			session: session.data
		};
	} catch (error) {
		const err = error as { response?: { status: number } };

		if (err.response && err.response.status === 403) {
			throw redirect(
				303,
				getFlowInitUrl(
					'login',
					new URLSearchParams({
						aal: 'aal2'
					})
				)
			);
		}
	}
};
