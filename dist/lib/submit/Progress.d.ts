import { RequestParams, LightResponse } from '../util/type';
/**
 *
 * @GET
 * 	@key !: sessionKey?;
 * 	@cd !: vaccineCode;
 * @returns
 */
export declare function progressRequest({ key, cd }: RequestParams): Promise<LightResponse>;
