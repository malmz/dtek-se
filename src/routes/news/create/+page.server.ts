import { modify } from '$lib/api';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ fetch, request }) => {
		const data = await request.formData();

		await modify(fetch, '/news', {
			title: data.get('title') as string,
			body: data.get('body') as string
		});
	}
};
