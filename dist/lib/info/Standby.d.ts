import { LightResponse, RequestParams } from '../util/type';
/**
 * @params { orgCd,sid }
 * @returns
 * @statusCode 302
 * @Location
 * 	/nidlogin.login
 * 		=> LoginException
 * 	/auth?key=${key}
 * 		=> Success
 * @Headers
 * 	@SetCookie
 * 		@NID_SES
 * 			*expire*
 * 				=> Cookie expired
 *
 */
export declare function standbyRequest({ orgCd, sid }: RequestParams): Promise<LightResponse>;
