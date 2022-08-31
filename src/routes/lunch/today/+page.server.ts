import { getLunch, type LunchMenu } from '$lib/api/lunch';
import type { PageServerLoad } from './$types';

export const GET: PageServerLoad = async () => {
	try {
		const data = await getLunch({ resturants: ['johanneberg-express'] });

		return {
			menu: data
		};
	} catch (error) {
		console.log(error);
		return {
			menu: []
		};
	}
};
