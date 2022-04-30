import {
	loadHarEntryByUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse
} from '../util';
import {
	RequestParams,
	LightResponse
} from '../util/type';
import { ClientRequest } from 'http';
import qs from 'querystring';

/**
 *
 * @GET
 * 	@key !: sessionKey?;
 * 	@cd !: vaccineCode;
 * @returns
 */

export async function progressRequest ({
	key,
	cd
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/info');
	let options: any | Request | ClientRequest = harEntry.request;
	const url = new URL(options?.url?.replace('/info', '/success'));
	const { host, protocol, pathname, search } = url;
	const query = Object.assign(
		qs.parse(search?.replace('?', '')),
		{ key, cd }
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

// progressRequest({
// 	key: string
// });
