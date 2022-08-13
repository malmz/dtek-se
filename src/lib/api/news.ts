import { createCrud } from './crud';

export interface News {
	id: number;
	title: string;
	body: string;
	created_at: string;
	updated_at: string;
}

export const {
	create: createNews,
	getAll: getAllNews,
	get: getNews,
	update: updateNews,
	delete: deleteNews
} = createCrud<News>('/news');
