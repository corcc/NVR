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
import { ClientRequest } from 'http';
import qs from 'querystring';

export async function authRequest ({
	key
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/auth');
	let options: any | Request | ClientRequest = harEntry.request;
	const url = new URL(options?.url);
	const { host, protocol, pathname, search } = url;
	const query = Object.assign(
		qs.parse(search?.replace('?', '')),
		{ key }
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
	const res = await request(options);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// authRequest({
// 	key: string
// });
