/// <reference types="node" />
import { ServerResponse } from 'http';
import { LightResponse } from './type';
export declare function saveCookiesFromResponse(res: any | ServerResponse): Promise<any>;
export declare function lightResponse(res: any | ServerResponse): LightResponse;
