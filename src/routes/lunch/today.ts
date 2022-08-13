import { fetchTodaysLunch, type LunchMenu } from '$lib/api/lunch';
import type { RequestHandler } from './__types/today';

export const GET: RequestHandler<{ express?: LunchMenu }> = async () => {
	try {
		const data = await fetchTodaysLunch('johanneberg-express');
		console.log(data);

		return {
			status: 200,
			body: {
				express: data
			}
		};
	} catch (error) {
		console.log(error);
		return {
			status: 200,
			body: {
				express: undefined
			}
		};
	}
};
