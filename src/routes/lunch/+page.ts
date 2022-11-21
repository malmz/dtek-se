import type { LunchMenu } from '$lib/api/lunch';
import { resource } from '$lib/req';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const data = await resource<LunchMenu[]>(
		fetch,
		'/lunch',
		{
			resturant: 'johanneberg-express',
			lang: 'se'
		},
		[]
	);

	return {
		menus: data
	};
};
