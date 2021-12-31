import {
	readHar,
	getEntries,
	filterByReqUrl,
	parseRequest,
	request,
	useCookiesFromBrowser
} from './util';
import { saveCookiesFromResponse } from './util/Response';
import {
	Json,
	ReservationEnv
} from './util/type';
export async function standby ({
	orgCd,
	sid
}: ReservationEnv): Promise<any> {
	const har: Json = readHar({});
	const harEntries = getEntries(har);
	const standbyEntry = filterByReqUrl(harEntries, '/reservation')[0];
	let standbyRequest = standbyEntry.request;
	standbyRequest = parseRequest(standbyRequest);
	standbyRequest = await useCookiesFromBrowser(standbyRequest);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(standbyRequest);
	await saveCookiesFromResponse(res);
	return res;
}

standby({
	orgCd: process.env.orgCd,
	sid: process.env.sid
});
