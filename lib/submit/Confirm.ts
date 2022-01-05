import {
	loadHarEntryByUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse,
	getUrlWithParams,
	getProgressURL
} from '../util';
import {
	RequestParams,
	LightResponse
} from '../util/type';
import { ClientRequest } from 'http';

/**
 *
 * 	@POST = method
 * 		@JSON = contentType
 * 	@BODY = {
 * 		@key = string;
 * }
 * @returns
 * 	@lightResponse
 *
 */
export async function confirmRequest ({
	key,
	cd
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/info');
	let req: any | Request | ClientRequest = harEntry.request;
	const url = req.url.replace('/info', '/confirm');
	req.url = getUrlWithParams({
		url,
		params: undefined
	});
	req = parseRequest(req);
	req.method = 'POST';
	req.headers.referer = getProgressURL({
		url,
		params: {
			key,
			cd
		}
	});
	req.body = JSON.stringify({ key });
	req = await useCookiesFromBrowser(req);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(req);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// confirmRequest({
// 	key: string
// });
