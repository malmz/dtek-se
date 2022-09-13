import { authApi, getFlowInitUrl } from '$lib/auth/api';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { AxiosError } from 'axios';

export const load: PageServerLoad = async ({ url, request }) => {
	const flow = url.searchParams.get('flow');
	const aal = url.searchParams.get('aal') ?? '';
	const refresh = url.searchParams.get('refresh') ?? '';
	const returnTo = url.searchParams.get('return_to') ?? '';

	const flowUrl = getFlowInitUrl(
		'login',
		new URLSearchParams({
			aal,
			refresh,
			return_to: returnTo
		})
	);

	if (!flow) {
		throw redirect(303, flowUrl);
	}

	try {
		const { data: flowData } = await authApi.getSelfServiceLoginFlow(
			flow,
			request.headers.get('cookie') ?? ''
		);

		return {
			flow: flowData
		};
	} catch (err) {
		if (err instanceof AxiosError) {
			if (!err.response) {
				throw err;
			}
			if (
				err.response.status === 404 ||
				err.response.status === 410 ||
				err.response.status === 403
			) {
				throw redirect(303, flowUrl);
			}
		}
		throw err;
	}
};
