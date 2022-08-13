import { req, type ApiResponse, type FetchFunction } from './fetch';

export interface LunchMenuItem {
	title?: string;
	body: string;
	preformatted: boolean;
	allergens?: { code: string; imageUrl: string }[];
	emmissions?: number;
	price?: string;
}

export interface LunchMenu {
	name: string;
	fetched_at: string;
	items: LunchMenuItem[];
}

export function getLunch(
	props: {
		resturants: string[];
		lang?: string;
		date?: Date;
	},
	fetch?: FetchFunction
): Promise<LunchMenu[]> {
	return req<LunchMenu[]>({
		method: 'GET',
		url: '/lunch',
		params: {
			resturant: props.resturants,
			lang: props.lang ?? 'se',
			date: props.date?.toISOString()
		},
		fetch
	});
}
