import {
	getHarPath,
	readHarFile,
	parseHar
} from './har';
import { URL } from 'url';
import {
	Cookie,
	Header,
	Json,
	Path
} from './type';
import { getCookies } from './Cookie';
import { ClientRequest } from 'http';
import { Entry, Har, Request } from 'har-format';

export function readHar ({
	path
}: Path): Har {
	let har: string | Har = path ?? getHarPath();
	har = readHarFile({
		path: har
	});
	har = parseHar({ har });
	return har;
}
export function getEntries (har: Har): Entry[] {
	return har.log.entries;
}

export function filterByReqUrl (harEntries: Entry[], url: string): Entry[] {
	if (harEntries instanceof Array) {
		return harEntries.filter((harEntry: any) => {
			return harEntry?.request?.url?.includes(url) ?? false;
		});
	}
	throw new Error();
}

export function parseRequest (request: Request): any | ClientRequest | Request {
	const fe = Object.fromEntries;
	const oe = Object.entries;
	const parseHeaders = function (headers: Array<Header>): Json {
		if (headers instanceof Array) {
			const _h: Array<Array<string>> = headers.map((header: Header): Array<string> => {
				const { name, value } = header;
				return [name, value];
			});
			return fe(_h);
		}
		throw new Error();
	};
	let url: any;
	let _e = oe(request).filter(([k, v]: Array<any>) => {
		if (k == 'url') {
			url = new URL(v);
		}
		switch (k) {
		case 'headersSize': return false;
		case 'bodySize': return false;
		case 'cookies': return false;
		case 'url': return false;
		default: return true;
		}
	});
	_e = oe((function () {
		const _d: any = fe(_e);
		try {
			_d.hostname = url.hostname;
			_d.path = (url.pathname) + (url.search);
			_d.port = url.port
				? url.port
				: (function () {
					switch (url.protocol) {
					case 'https:': return 443;
					case 'http:': return 80;
					}
					throw new Error();
				})();
		} catch (e) {
			return _d;
		}
		return _d;
	})());
	_e = _e.map(([k, v]: Array<any>) => {
		if (k == 'headers') {
			return [k, parseHeaders(v)];
		}
		return [k, v];
	});
	return fe(_e);
}

export async function useCookiesFromBrowser (req: any | ClientRequest): Promise<ClientRequest> {
	let _cookie = req.headers.Cookie.split('; ').map(async (cookieStr: string): Promise<string> => {
		// Use Cookies From Browser
		const _eq = cookieStr.indexOf('=');
		const cookieName = function (c: string) {
			return c.substring(0, _eq);
		};
		const cookieValue = async function (c: string) {
			let _a: Cookie[] | Cookie = await getCookies({});
			_a = _a.filter((cookie: any) => {
				const { name } = cookie;
				return name == cookieName(c);
			})[0];
			const { value } = _a;
			return value;
		};
		const name = cookieName(cookieStr);
		const value = await cookieValue(cookieStr);
		return [name, value].join('=');
	});
	_cookie = await Promise.all(_cookie);
	req.headers.Cookie = _cookie.join('; ');
	return req;
}
