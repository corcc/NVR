import { Cookie, CookiesParam } from './type';
export declare function getCookies({ filter }: CookiesParam): Promise<Cookie[]>;
export declare function setCookies({ cookies }: CookiesParam): Promise<Promise<any>[]>;
