import { getLunch, type LunchMenu } from '$lib/api/lunch';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const data = await getLunch({ resturants: [params.id] });

		return {
			menu: data[0]
		};
	} catch (error) {
		console.log(error);
		return {
			menu: null
		};
	}
};
