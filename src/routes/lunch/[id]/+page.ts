import { resource } from '$lib/api';
import type { LunchMenu } from '$lib/api/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const data = await resource<LunchMenu[]>(
		fetch,
		'/lunch',
		{ resturant: params.id, lang: 'se' },
		[]
	);

	return {
		menu: data.length ? data[0] : null
	};
};
