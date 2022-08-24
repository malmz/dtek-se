import { getLunch, type LunchMenu } from '$lib/api/lunch';
import type { RequestHandler } from './__types/today';

export const GET: RequestHandler<{ menu?: LunchMenu[] }> = async () => {
	try {
		const data = await getLunch({ resturants: ['johanneberg-express'] });

		return {
			status: 200,
			body: {
				menu: data
			}
		};
	} catch (error) {
		console.log(error);
		return {
			status: 200,
			body: {
				menu: []
			}
		};
	}
};
