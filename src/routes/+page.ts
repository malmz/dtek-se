import type { LunchMenu } from '$lib/api/types';
import { resource } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const resturants = ['johanneberg-express', 'linsen'];

	const menus = (
		await resource<LunchMenu[]>(
			fetch,
			'/lunch',
			{
				resturant: resturants,
				lang: 'se'
			},
			[]
		)
	).map((menu, i) => ({
		...menu,
		id: resturants[i]
	}));

	return {
		menus
	};
};
