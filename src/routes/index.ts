import { getLunch, type LunchMenu } from '$lib/api/lunch';
import type { RequestHandler } from './__types';

export const GET: RequestHandler<{ menus: LunchMenu[] }> = async () => {
	try {
		const menus = await getLunch({
			resturants: ['johanneberg-express', 'karresturangen']
		});

		return {
			status: 200,
			body: {
				menus
			}
		};
	} catch (error) {
		console.error(error);
		return {
			status: 200,
			body: {
				menus: []
			}
		};
	}
};
