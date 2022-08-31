import { getLunch, type LunchMenu } from '$lib/api/lunch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const menus = await getLunch({
			resturants: ['johanneberg-express', 'karresturangen']
		});

		return {
			menus
		};
	} catch (error) {
		console.error(error);
		return {
			menus: []
		};
	}
};
