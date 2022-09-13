import { authApi } from '$lib/auth/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	try {
		const { data: logoutFlow } =
			await authApi.createSelfServiceLogoutFlowUrlForBrowsers(
				request.headers.get('cookie') ?? ''
			);
		return {
			logoutFlow
		};
	} catch (error) {
		return {
			logoutFlow: {
				logout_url: ''
			}
		};
	}
};
