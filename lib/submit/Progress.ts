import {
	loadHarEntryByUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse,
	getUrlWithParams
} from '../util';
import {
	RequestParams,
	LightResponse
} from '../util/type';
import { ClientRequest } from 'http';

/**
 *
 * @GET
 * 	@key !: sessionKey?;
 * 	@cd !: vaccineCode;
 * @returns
 */

export async function progressRequest ({
	key,
	cd
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/info');
	let req: any | Request | ClientRequest = harEntry.request;
	req.url = getUrlWithParams({
		url: req.url.replace('/info', '/progress'),
		params: {
			key,
			cd
		}
	});
	req = parseRequest(req);
	req = await useCookiesFromBrowser(req);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(req);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// progressRequest({
// 	key: string
// });
