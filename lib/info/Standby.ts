import { ClientRequest } from 'http';
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
	LightResponse,
	RequestParams
} from '../util/type';

/**
 * @params { orgCd,sid }
 * @returns
 * @statusCode 302
 * @Location
 * 	/nidlogin.login
 * 		=> LoginException
 * 	/auth?key=${key}
 * 		=> Success
 * @Headers
 * 	@SetCookie
 * 		@NID_SES
 * 			*expire*
 * 				=> Cookie expired
 *
 */
export async function standbyRequest ({
	orgCd,
	sid
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/reservation');
	let req: any | Request | ClientRequest = harEntry.request;
	req.url = getUrlWithParams({
		url: req.url,
		params: {
			orgCd,
			sid
		}
	});
	req = parseRequest(req);
	req = await useCookiesFromBrowser(req);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(req);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// standbyRequest({
// 	orgCd: string | number,
// 	sid: string | number
// });
