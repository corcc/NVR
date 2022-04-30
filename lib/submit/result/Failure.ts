import {
	loadHarEntryByUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse,
	getProgressURL
} from '../../util';
import {
	RequestParams,
	LightResponse
} from '../../util/type';
import { ClientRequest } from 'http';
import qs from 'querystring';

export async function failureRequest ({
	key,
	cd,
	code
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/info');
	let options: any | Request | ClientRequest = harEntry.request;
	const url = new URL(options?.url?.replace('/info', '/failure'));
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
	options.headers.referer = getProgressURL(
		{
			url: `${protocol}//${host}/${pathname}?${qs.stringify(query)}`,
			params: { key, cd }
		}
	);
	const res = await request(options);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// failureRequest({
// 	key: string
// });
