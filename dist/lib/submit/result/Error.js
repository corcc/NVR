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
exports.errorRequest = void 0;
const util_1 = require("../../util");
function errorRequest({ key, cd, code }) {
    return __awaiter(this, void 0, void 0, function* () {
        const harEntry = yield (0, util_1.loadHarEntryByUrl)('/info');
        let req = harEntry.request;
        const url = req.url.replace('/info', '/error');
        req.url = (0, util_1.getUrlWithParams)({
            url,
            params: {
                key,
                code
            }
        });
        req = (0, util_1.parseRequest)(req);
        req.headers.referer = (0, util_1.getProgressURL)({
            url,
            params: {
                key,
                cd
            }
        });
        req = yield (0, util_1.useCookiesFromBrowser)(req);
        // TODO : Use Cookies from Browser => Clean Code
        const res = yield (0, util_1.request)(req);
        yield (0, util_1.saveCookiesFromResponse)(res);
        return (0, util_1.lightResponse)(res);
    });
}
exports.errorRequest = errorRequest;
// errorRequest({
// 	key: 'undefined'
// });
