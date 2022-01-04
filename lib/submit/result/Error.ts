import {
	loadHarEntryByUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse,
	getUrlWithParams
} from '../../util';
import {
	RequestParams,
	LightResponse
} from '../../util/type';
import { ClientRequest } from 'http';

export async function errorRequest ({
	key,
	code
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/info');
	let req: any | Request | ClientRequest = harEntry.request;
	req.url = getUrlWithParams({
		url: req.url.replace('/info', '/error'),
		params: {
			key,
			code
		}
	});
	req = parseRequest(req);
	req = await useCookiesFromBrowser(req);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(req);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// errorRequest({
// 	key: 'undefined'
// });
