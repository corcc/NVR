import {
    readFileSync
} from 'fs';

import {
    Path
} from '../type';

export function readHarFile({
    path
}: Path): string {
    return readFileSync(`${path}`).toString();
}