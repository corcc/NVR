"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightResponse = exports.saveCookiesFromResponse = void 0;
const _1 = require(".");
const URL_1 = require("./URL");
function saveCookiesFromResponse(res) {
    return __awaiter(this, void 0, void 0, function* () {
        let setCookie = yield res.headers['set-cookie'];
        setCookie = yield setCookie.map((setCookie) => __awaiter(this, void 0, void 0, function* () {
            const _setCookie = (function () {
                const _setCookieStr = setCookie.split(';')[0];
                const [name, value] = _setCookieStr.split('=');
                return {
                    name,
                    value
                };
            })();
            const result = yield (0, _1.setCookies)({
                cookies: [_setCookie]
            });
            return result;
        }));
        return setCookie;
    });
}
exports.saveCookiesFromResponse = saveCookiesFromResponse;
function lightResponse(res) {
    const { statusCode, responseCode, headers, body } = res;
    let { location } = headers;
    location = location ? new URL(location) : location;
    if (location) {
        location.params = (0, URL_1.getParsedSearchParams)(location);
    }
    return {
        responseCode: responseCode !== null && responseCode !== void 0 ? responseCode : statusCode,
        headers,
        body,
        location: location !== null && location !== void 0 ? location : ''
    };
}
exports.lightResponse = lightResponse;
