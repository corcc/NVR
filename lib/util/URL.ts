import { URL } from 'url';
const fe = Object.fromEntries;
export function getURL (url: string | URL) {
	return url instanceof URL ? url : new URL(url);
}
export function getSearchParams (url: URL | string): string {
	return (function (_u: URL) {
		let { search } = _u;
		search = (function (s: string) {
			return s.startsWith('?') ? s.replace('?', '') : s;
		})(search);
		return search;
	})(getURL(url));
}

export function getParsedSearchParams ({
	url,
	search
}: {
    url?: string | URL;
    search?: string;
}): {
    [x: string]: string;
} {
	const parse = function (s: string) {
		const e = s.split('&').map((p: string) => {
			const eq = p.indexOf('=');
			const n = p.substring(0, eq);
			const v = p.substring(eq + 1, p.length);
			return [n, v];
		});
		return fe(e);
	};
	if (search) {
		return parse(search);
	}
	if (url) {
		return (function (_u: URL) {
			return parse(getSearchParams(_u));
		})(getURL(url));
	}
	throw new Error();
}

export function getUrlWithParams ({
	url,
	params
}: {
	url: string;
	params: any;
}): string {
	const _url = (function (_u: string) {
		const {
			protocol,
			hostname,
			pathname
		} = new URL(_u);
		const _a = `${protocol}//${hostname}${pathname}`;
		return _a;
	})(url);

	return `${_url}` + (params
		? ('?' + Object.entries(params).map(([k, v]) => {
			return [k, v].join('=');
		}).join('&'))
		: '');
}
