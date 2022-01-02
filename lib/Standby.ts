import { Har } from 'har-format';
import { ClientRequest } from 'http';
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
	LightResponse,
	ReservationEnv
} from './util/type';

/**
 * @params { orgCd,sid }
 * @returns
 * @statusCode 302
 * @Location
 * 	https://nid.naver.com/nidlogin.login
 * 		=> LoginException
 * 	https://v-search.nid.naver.com/reservation/auth?key=${key}
 * 		=> Success
 * @Headers
 * 	@SetCookie
 * 		@NID_SES
 * 			*expire*
 * 				=> Cookie expired
 *
 */
export async function standby ({
	orgCd,
	sid
}: ReservationEnv): Promise<LightResponse> {
	const har: Har = readHar({});
	const harEntries = getEntries(har);
	const standbyEntry = filterByReqUrl(harEntries, '/reservation')[0];
	let standbyRequest: any | Request | ClientRequest = standbyEntry.request;
	standbyRequest.url = getUrlWithParams({
		url: standbyRequest.url,
		params: {
			orgCd,
			sid
		}
	});
	standbyRequest = parseRequest(standbyRequest);
	standbyRequest = await useCookiesFromBrowser(standbyRequest);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(standbyRequest);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// standby({
// 	orgCd: process.env.orgCd,
// 	sid: process.env.sid
// });
