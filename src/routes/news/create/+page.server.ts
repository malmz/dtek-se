import { createNews } from '$lib/api/news';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		createNews({
			title: data.get('title') as string,
			body: data.get('body') as string
		});
	}
};
