import { ServerResponse } from 'http';
import { setCookies } from '.';
import { Cookie, LightResponse } from './type';
import { getParsedSearchParams } from './URL';

export async function saveCookiesFromResponse (res: any | ServerResponse) {
	let setCookie = await res.headers['set-cookie'];
	setCookie = await setCookie.map(async (setCookie: string) => {
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
	return setCookie;
}

export function lightResponse (res: any | ServerResponse): LightResponse {
	const {
		statusCode,
		responseCode,
		headers,
		body
	}: any = res;
	let { location } = headers;
	location = location ? new URL(location) : location;
	if (location) {
		location.params = getParsedSearchParams(location);
	}
	return {
		responseCode: responseCode ?? statusCode,
		headers,
		body,
		location: location ?? ''
	};
}
