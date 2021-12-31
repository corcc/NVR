import { setCookies } from '.';
import { Cookie } from './type';

export async function saveCookiesFromResponse (res: any) {
	await res.headers['set-cookie'].forEach(async (setCookie: string) => {
		const _setCookie: Cookie = (function (): Cookie {
			const _setCookieStr: string = setCookie.split(';')[0];
			const [name, value]: string[] = _setCookieStr.split('=');
			return {
				name,
				value
			};
		})();
		const result = await setCookies({
			cookies: [_setCookie]
		});
		return result;
	});
}
