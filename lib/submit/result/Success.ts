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
	key
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/info');
	let req: any | Request | ClientRequest = harEntry.request;
	req.url = getUrlWithParams({
		url: req.url.replace('/info', '/success'),
		params: {
			key
		}
	});
	req = parseRequest(req);
	req = await useCookiesFromBrowser(req);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(req);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// successRequest({
// 	key: string
// });
