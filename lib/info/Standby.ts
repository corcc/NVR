import { ClientRequest } from 'http';
import {
	loadHarEntryByUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse
} from '../util';
import {
	LightResponse,
	RequestParams
} from '../util/type';
import qs from 'querystring';

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
	let options: any | Request | ClientRequest = harEntry.request;
	const url = new URL(options?.url);
	const { host, protocol, pathname, search } = url;
	const query = Object.assign(
		qs.parse(search?.replace('?', '')),
		{ orgCd, sid }
	);
	const path = [pathname, qs.stringify(query)]
		.join('?');
	options = Object.assign(
		Object.fromEntries(
			Object.entries(options)
				.filter(([k, v]) => (k != 'url'))
		),
		{ host, protocol, path }
	);
	options = parseRequest(options);
	options = await useCookiesFromBrowser(options);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(options);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// standbyRequest({
// 	orgCd: string | number,
// 	sid: string | number
// });
