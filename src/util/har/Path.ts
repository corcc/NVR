import {
	readdirSync
} from 'fs';
const cwd = process.cwd();
export function getHarPath (): string {
	let l = readdirSync(cwd);
	l = l.filter((v) => (v.includes('.har')));
	if (!l[0]) {
		throw new Error('Cannot Find Har File');
	}
	return `${cwd}/${l[0]}`;
}
