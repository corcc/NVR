import { Har } from 'har-format';
import {
	HarString
} from '../type';
export function parseHar ({
	har
}: HarString): Har {
	return JSON.parse(har);
}
