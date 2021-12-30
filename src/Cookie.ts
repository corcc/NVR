import { Database } from 'sqlite';
import { DBPath, DBSelect, selectDB, updateDB, openDB, getCookiePath } from './cookie';

type GetCookieParams = {
    filter?: Function
}

type Cookie = {
    name: string;
    value: string;
    domain?: string;
}
type Cookies = Array<Cookie>;

type CookiesParam = {
    cookies: Array<Cookie>
}

var db: Database | Promise<Database>;
const cookieFilter = {
    'naver': function (cookie: any) {
        return cookie['host'].match(/.*n*aver*/);
    }
}

async function getCookies({
    filter
}: GetCookieParams): Promise<Cookie[]> {
    const path = getCookiePath();
    db = await openDB({
        path
    });
    let result = await selectDB(db, {
        from: 'moz_cookies',
        filter: filter ?? cookieFilter['naver']
    })
    result = result.map((c: any): Cookie => {
        const { name, value } = c;
        return {
            name,
            value
        }
    })
    console.log(result);
    return result;
}

async function setCookies({
    cookies
}: CookiesParam): Promise<Cookie[]> {
    const path = getCookiePath();
    db = await openDB({
        path
    });
    let result = cookies.map(async (cookie: Cookie): Promise<Cookie[]> => {
        const result = await updateDB(db, {
            table: 'moz_cookies',
            set: {
                'value': cookie['value']
            },
            where: {
                'name': cookie['name']
            }
        });
        const ca: Cookie[] = result.map((c: any): Cookie => {
            const { name, value } = c;
            return {
                name,
                value
            };
        });
        return ca;
    })
    return result[result.length];
}

export { getCookies, setCookies }