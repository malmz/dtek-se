import { req, type FetchFunction } from './fetch';

interface CrudClient<T, C, U> {
	create(data: C, fetch?: FetchFunction): Promise<T>;
	getAll(fetch?: FetchFunction): Promise<T[]>;
	get(id: number, fetch?: FetchFunction): Promise<T>;
	update(id: number, data: U, fetch?: FetchFunction): Promise<T>;
	delete(id: number, fetch?: FetchFunction): Promise<T>;
}

export function createCrud<
	T,
	C = Omit<T, 'id' | 'created_at' | 'updated_at'>,
	U = Omit<T, 'id' | 'created_at' | 'updated_at'>
>(url: string): CrudClient<T, C, U> {
	return {
		create: (data, fetch) => req({ method: 'POST', url, body: data, fetch }),
		getAll: (fetch) => req({ method: 'GET', url, fetch }),
		get: (id, fetch) => req({ method: 'GET', url: `${url}/${id}`, fetch }),
		update: (id, data, fetch) =>
			req({ method: 'PUT', url: `${url}/${id}`, body: data, fetch }),
		delete: (id, fetch) => req({ method: 'DELETE', url: `${url}/${id}`, fetch })
	};
}
