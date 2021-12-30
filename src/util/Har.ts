import {
	getHarPath,
	readHarFile,
	parseHar
} from './har';
import { URL } from 'url';
import {
	Header,
	Json,
	Path
} from './type';

export function readHar ({
	path
}: Path): Json {
	let har: string | Json = path ?? getHarPath();
	har = readHarFile({
		path: har
	});
	har = parseHar({ har });
	return har;
}
export function getEntries (har: any): any {
	return har.log.entries;
}

export function filterByReqUrl (harEntries: any, url: string): any {
	if (harEntries instanceof Array) {
		return harEntries.filter((harEntry: any) => {
			return harEntry?.request?.url?.includes(url) ?? false;
		});
	}
	throw new Error();
}

export function parseRequest (request: any) {
	const fe = Object.fromEntries;
	const oe = Object.entries;
	const parseHeaders = function (headers: Array<Header>) {
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
