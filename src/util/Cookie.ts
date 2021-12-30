import { Database } from 'sqlite';
import { selectDB, updateDB, openDB, getCookiePath } from './cookie';
import { parseCookie } from './cookie/Parse';
import { Cookie, CookiesParam } from './type';

var db: Database | Promise<Database>;
const cookieFilter = {
    'naver': function (cookie: any) {
        return cookie['host'].match(/.*n*aver*/);
    }
};

export async function getCookies({
    filter
}: CookiesParam): Promise<Cookie[]> {
    const path = getCookiePath();
    db = await openDB({
        path
    });
    const options = {
        from: 'moz_cookies',
        filter: filter ?? cookieFilter['naver']
    };
    let result = await selectDB(db, options);
    result = result.map((c: any): Cookie => parseCookie(c));
    console.log(result);
    return result;
}

export async function setCookies({
    cookies
}: CookiesParam): Promise<Cookie[]> {
    const path = getCookiePath();
    db = await openDB({
        path
    });
    let result = cookies.map(async (cookie: Cookie): Promise<Cookie[]> => {
        const options = {
            table: 'moz_cookies',
            set: {
                'value': cookie['value']
            },
            where: {
                'name': cookie['name']
            }
        };
        const result = await updateDB(db, options);
        const ca: Cookie[] = result.map((c: any): Cookie => parseCookie(c));
        return ca;
    })
    return result[result.length];
}
