import {
	readHar,
	getEntries,
	filterByReqUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse
} from './util';
import { URL } from 'url';
import {
	Json,
	AuthEnv
} from './util/type';

function getUrl ({
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

export async function auth ({
	key
}: AuthEnv): Promise<any> {
	const har: Json = readHar({});
	const harEntries = getEntries(har);
	const authEntry = filterByReqUrl(harEntries, '/auth')[0];
	let authRequest = authEntry.request;
	authRequest.url = getUrl({
		url: authRequest.url,
		params: {
			key
		}
	});
	authRequest = parseRequest(authRequest);
	authRequest = await useCookiesFromBrowser(authRequest);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(authRequest);
	await saveCookiesFromResponse(res);
	return res;
}

// auth({
// 	key: 'undefined'
// });
