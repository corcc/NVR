/// <reference types="node" />
import { Path } from './type';
import { ClientRequest } from 'http';
import { Entry, Har, Request } from 'har-format';
export declare function readHar({ path }: Path): Har;
export declare function getEntries(har: Har): Entry[];
export declare function filterByReqUrl(harEntries: Entry[], url: string): Entry[];
export declare function parseRequest(request: Request): any | ClientRequest | Request;
export declare function useCookiesFromBrowser(req: any | ClientRequest): Promise<ClientRequest>;
export declare function loadHarEntryByUrl(url: string): Promise<Entry>;
