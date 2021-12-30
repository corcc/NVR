import {
    getHarPath,
    readHarFile,
    parseHar
} from './har';
import {
    Json,
    Path
} from './type';

export function readHar({
    path
}: Path): Json {
    let har: string | Json = path ?? getHarPath();
    har = readHarFile({
        path: har
    });
    har = parseHar({ har });
    return har;
}