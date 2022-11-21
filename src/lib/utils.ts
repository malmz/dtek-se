export function createParams(params?: Record<string, string | string[] | undefined>): string {
	if (params) {
		const p = new URLSearchParams();
		for (const [key, value] of Object.entries(params)) {
			if (Array.isArray(value)) {
				for (const v of value) {
					p.append(key, v);
				}
			} else {
				value && p.append(key, value);
			}
		}
		return '?' + p.toString();
	} else {
		return '';
	}
}
