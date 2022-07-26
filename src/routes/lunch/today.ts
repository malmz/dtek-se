import { fetchTodaysLunch, type LunchMenu } from '$lib/api/lunch';
import type { RequestHandler } from './__types/today';

export const GET: RequestHandler<{ express: LunchMenu }> = async () => {
	const data = await fetchTodaysLunch('johanneberg-express');

	return {
		status: 200,
		body: {
			express: data
		}
	};
};
