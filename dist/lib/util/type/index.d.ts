export declare type RequestParams = {
    orgCd?: string | number | bigint;
    sid?: string | number | bigint;
    key?: string;
    cd?: string;
    code?: string;
};
export declare type RequestBody = {
    body?: string;
};
export declare type Json = {
    [x: string]: string | Json | number | bigint;
};
export declare type Path = {
    path?: string;
};
export { Path as DBPath };
export declare type Env = string;
export declare type DBSelect = {
    select?: string;
    set?: Json;
    table?: string;
    from?: string;
    where?: Json | string;
    filter?: Function;
};
export declare type Cookie = {
    name: string;
    value: string;
    host?: string;
    domain?: string;
};
export declare type Header = {
    name: string;
    value: string;
};
export declare type CookiesParam = {
    cookies?: Array<Cookie>;
    filter?: Function;
};
export declare type HarString = {
    har: string;
};
export declare type Headers = {
    [x: string]: string;
};
export declare type Location = string | (URL & {
    params: {
        [x: string]: string;
    };
});
export declare type LightResponse = {
    responseCode: number;
    headers: Headers;
    body: string;
    location?: Location;
};
