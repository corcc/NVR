import { Database } from 'sqlite';
import { selectDB, updateDB, openDB, getCookiePath } from './cookie';
import { parseCookie } from './cookie/Parse';
import { Cookie, CookiesParam } from './type';

let db: Database | Promise<Database>;
const cookieFilter = {
	naver: function (cookie: Cookie) {
		if (typeof cookie.host == 'undefined') {
			throw new Error();
		}
		return cookie.host.match(/.*n*aver*/);
	}
};

export async function getCookies ({
	filter
}: CookiesParam): Promise<Cookie[]> {
	const path = getCookiePath();
	db = await openDB({
		path
	});
	const options = {
		from: 'moz_cookies',
		filter: filter ?? cookieFilter.naver
	};
	let result = await selectDB(db, options);
	result = result.map((c: any): Cookie => parseCookie(c));
	return result;
}

export async function setCookies ({
	cookies
}: CookiesParam) {
	const path = getCookiePath();
	db = await openDB({
		path
	});
	if (typeof cookies === 'undefined') {
		throw new Error();
	}
	const result = await cookies.map(async (cookie: Cookie) => {
		const options = {
			table: 'moz_cookies',
			set: {
				value: cookie.value
			},
			where: {
				name: cookie.name
			}
		};
		await updateDB(db, options);
		let result: any = await getCookies({});
		result = result.filter((c: any) => {
			return c.name == cookie.name;
		});
		return result;
	});
	return result;
}
