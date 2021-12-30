import {
	HarString,
	Json
} from '../type';
export function parseHar ({
	har
}: HarString): Json {
	return JSON.parse(har);
}
