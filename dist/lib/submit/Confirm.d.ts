import { RequestParams, LightResponse } from '../util/type';
/**
 *
 * 	@POST = method
 * 		@JSON = contentType
 * 	@BODY = {
 * 		@key = string;
 * }
 * @returns
 * 	@lightResponse
 *
 */
export declare function confirmRequest({ key, cd }: RequestParams): Promise<LightResponse>;
