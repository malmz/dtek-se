import { req } from './fetch';

export interface LunchMenuItem {
	title?: string;
	body: string;
	preformatted: boolean;
	allergens?: { code: string; imageUrl: string }[];
	emmissions?: number;
	price?: string;
}

export interface LunchMenu {
	items: LunchMenuItem[];
}

export async function fetchTodaysLunch(resturant: string, lang = 'se'): Promise<LunchMenu> {
	return req<LunchMenu>('GET', `/lunch/today/${resturant}`, { lang });
}
