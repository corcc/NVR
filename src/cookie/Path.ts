import { getEnv } from './Env';
import path from 'path';
import fs from 'fs';
const HOME: string = getEnv('HOME');
const firefoxPrefix: string = (function () {
    return path.resolve((((h: string) => {
        return path.join(h, '.mozilla/firefox/');
    })(HOME)));
})();

function getCookiePath() {
    const paths = fs.readdirSync(firefoxPrefix);
    const devEditionDefaultPath = (function (): string {
        type name = string;
        type path = string;
        const dir: name = paths.filter((_) => (_.includes('dev-edition')))[0];
        const full: path = (function () {
            return path.resolve((() => {
                return path.join(firefoxPrefix, dir);
            })());
        })();
        return full;
    })()
    console.warn(`Cookie Path: ${devEditionDefaultPath}/cookies.sqlite`)
    return `${devEditionDefaultPath}/cookies.sqlite`;
}
export { getCookiePath }