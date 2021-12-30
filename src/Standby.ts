import {
	readHar,
	getCookies,
	setCookies,
	getEntries,
	filterByReqUrl,
	parseRequest,
	request
} from './util';
import {
	Json,
	ReservationEnv
} from './util/type';
export async function standby({
	orgCd,
	sid
}: ReservationEnv) {
	const har: Json = readHar({});
	const harEntries = getEntries(har);
	const standbyEntry = filterByReqUrl(harEntries, '/reservation')[0];
	let standbyRequest = standbyEntry.request;
	standbyRequest = parseRequest(standbyRequest);
	let _cookie = standbyRequest.headers.Cookie.split('; ').map(async (cookieStr: string): Promise<string> => {
		// Use Cookies From Browser
		const _eq = cookieStr.indexOf('=');
		const cookieName = function (c: string) {
			return c.substring(0, _eq);
		};
		const cookieValue = async function (c: string) {
			let _a: any = await getCookies({});
			_a = _a.filter((cookie: any) => {
				const { name } = cookie;
				return name == cookieName(c);
			})[0];
			const { value } = _a;
			return value;
		};
		const name = cookieName(cookieStr);
		const value = await cookieValue(cookieStr);
		return [name, value].join('=');
	});
	_cookie = await Promise.all(_cookie);
	console.log(_cookie);
	standbyRequest.headers.Cookie = _cookie;
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(standbyRequest);
	return res;
}

standby({
	orgCd: process.env.orgCd,
	sid: process.env.sid
});
