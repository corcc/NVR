import {
	readHar,
	getEntries,
	filterByReqUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse,
	getUrlWithParams
} from './util';
import {
	AuthEnv,
	LightResponse
} from './util/type';
import { Har } from 'har-format';
import { ClientRequest } from 'http';

export async function auth ({
	key
}: AuthEnv): Promise<LightResponse> {
	const har: Har = readHar({});
	const harEntries = getEntries(har);
	const authEntry = filterByReqUrl(harEntries, '/auth')[0];
	let authRequest: any | Request | ClientRequest = authEntry.request;
	authRequest.url = getUrlWithParams({
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
	return lightResponse(res);
}

// auth({
// 	key: 'undefined'
// });
