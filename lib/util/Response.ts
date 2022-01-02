import { ServerResponse } from 'http';
import { setCookies } from '.';
import { Cookie, LightResponse } from './type';
import { getParsedSearchParams } from './URL';

export async function saveCookiesFromResponse (res: any | ServerResponse) {
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

export function lightResponse (res: any | ServerResponse): LightResponse {
	const {
		responseCode,
		headers,
		body
	}: any = res;
	let { location } = headers;
	location = new URL(location);
	location.params = getParsedSearchParams(location);
	return {
		responseCode,
		headers,
		body,
		location
	};
}
