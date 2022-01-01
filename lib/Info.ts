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
	InfoEnv
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

export async function info ({
	key
}: InfoEnv): Promise<any> {
	const har: Json = readHar({});
	const harEntries = getEntries(har);
	const infoEntry = filterByReqUrl(harEntries, '/info')[0];
	let infoRequest = infoEntry.request;
	infoRequest.url = getUrl({
		url: infoRequest.url,
		params: {
			key
		}
	});
	infoRequest = parseRequest(infoRequest);
	infoRequest = await useCookiesFromBrowser(infoRequest);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(infoRequest);
	await saveCookiesFromResponse(res);
	return res;
}

// info({
// 	key: 'undefined'
// });
