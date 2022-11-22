export interface LunchMenuItem {
	title?: string;
	body: string;
	preformatted: boolean;
	allergen: { code: string; imageUrl: string }[];
	emission?: number;
	price?: string;
}

export interface LunchMenu {
	name: string;
	fetched_at: string;
	items: LunchMenuItem[];
}
