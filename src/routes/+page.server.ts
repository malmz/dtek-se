import { getLunch, type LunchMenu } from '$lib/api/lunch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const menus = await getLunch({
			resturants: ['johanneberg-express', 'karresturangen', 'linsen']
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
