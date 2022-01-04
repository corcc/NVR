import { ClientRequest, ServerResponse } from 'http';
import { RequestBody } from './type';

const https = require('https');
export async function request (options: ClientRequest & RequestBody): Promise<any | ServerResponse> {
	return await new Promise((resolve, reject) => {
		let body = '';
		const req = https.request(options, (res: any) => {
			console.log(`URL: ${options.path}`);
			console.log(`LOCATION: ${res.headers.location}`);
			console.log(`statusCode: ${res.statusCode}`);
			res.on('data', (d: any) => {
				body += d;
			});
			res.on('end', () => {
				res.body = body || undefined;
				resolve(res);
			});
		});
		if (options.body) {
			req.write(options.body);
		}
		req.on('error', (error: any) => {
			console.error(`URL: ${options.path}`);
			console.error(error);
			reject(error);
		});
		req.end();
	});
}
