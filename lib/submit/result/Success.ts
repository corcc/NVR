import {
	loadHarEntryByUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse,
	getUrlWithParams,
	getProgressURL
} from '../../util';
import {
	LightResponse,
	RequestParams
} from '../../util/type';
import { ClientRequest } from 'http';

/**
 *
 * @method
 * 	@get
 * @param
 * 	@key
 * @returns
 * 	@lightResponse
 */

export async function successRequest ({
	key,
	cd
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/info');
	let req: any | Request | ClientRequest = harEntry.request;
	const url = req.url.replace('/info', '/success');
	req.url = getUrlWithParams({
		url,
		params: {
			key
		}
	});
	req = parseRequest(req);
	req.headers.referer = getProgressURL({
		url,
		params: {
			key,
			cd
		}
	});
	req = await useCookiesFromBrowser(req);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(req);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// successRequest({
// 	key: string
// });
