import type { LunchMenu } from '$lib/api/lunch';
import { resource } from '$lib/req';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const resturants = ['johanneberg-express', 'linsen'];

	const menus = (
		await resource<LunchMenu[]>(fetch, '/lunch', {
			resturants,
			lang: 'se'
		})
	).map((menu, i) => ({
		...menu,
		id: resturants[i]
	}));

	return {
		menus
	};
};
