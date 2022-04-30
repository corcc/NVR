/// <reference types="node" />
import { URL } from 'url';
export declare function getURL(url: string | URL): URL;
export declare function getSearchParams(url: URL | string): string;
export declare function getParsedSearchParams({ url, search }: {
    url?: string | URL;
    search?: string;
}): {
    [x: string]: string;
};
export declare function getUrlWithParams({ url, params }: {
    url: string;
    params: any;
}): string;
export declare function getProgressURL({ url, params }: {
    url: string;
    params: any;
}): string;
