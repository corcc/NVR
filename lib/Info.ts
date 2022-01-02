import {
	readHar,
	getEntries,
	filterByReqUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse
} from './util';
import { URL } from 'url';
import {
	InfoEnv,
	LightResponse
} from './util/type';
import { ClientRequest } from 'http';
import { Har } from 'har-format';

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
}: InfoEnv): Promise<LightResponse> {
	const har: Har = readHar({});
	const harEntries = getEntries(har);
	const infoEntry = filterByReqUrl(harEntries, '/info')[0];
	let infoRequest: any | Request | ClientRequest = infoEntry.request;
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
	return lightResponse(res);
}

// info({
// 	key: 'undefined'
// });
