import {
	loadHarEntryByUrl,
	parseRequest,
	request,
	useCookiesFromBrowser,
	saveCookiesFromResponse,
	lightResponse,
	getUrlWithParams,
	getProgressURL
} from '../../util';
import {
	RequestParams,
	LightResponse
} from '../../util/type';
import { ClientRequest } from 'http';

export async function failureRequest ({
	key,
	cd,
	code
}: RequestParams): Promise<LightResponse> {
	const harEntry = await loadHarEntryByUrl('/info');
	let req: any | Request | ClientRequest = harEntry.request;
	const url = req.url.replace('/info', '/failure');
	req.url = getUrlWithParams({
		url,
		params: {
			key,
			code
		}
	});
	req = parseRequest(req);
	req.headers.referer = getProgressURL({
		url,
		params: {
			key,
			cd
		}
	});
	req = await useCookiesFromBrowser(req);
	// TODO : Use Cookies from Browser => Clean Code
	const res = await request(req);
	await saveCookiesFromResponse(res);
	return lightResponse(res);
}

// failureRequest({
// 	key: string
// });
