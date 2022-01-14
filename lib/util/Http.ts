import { ClientRequest, ServerResponse } from 'http';
import { RequestBody } from './type';
import https from 'https';
type Body = any & Array<number> & string;
export async function request (options: ClientRequest & RequestBody): Promise<any | ServerResponse> {
	return await new Promise((resolve, reject) => {
		let body: Body = [];
		const req = https.request(options, (res: any) => {
			console.log(`URL: ${options.path}`);
			console.log(`LOCATION: ${res.headers.location}`);
			console.log(`statusCode: ${res.statusCode}`);
			res.on('data', (chunk: Buffer) => {
				chunk.forEach((x: number) => {
					body.push(x);
				});
			});
			res.on('end', () => {
				body = Buffer.from(body);
				res.body = body.toString();
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
