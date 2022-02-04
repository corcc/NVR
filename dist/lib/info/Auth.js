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
exports.authRequest = void 0;
const util_1 = require("../util");
function authRequest({ key }) {
    return __awaiter(this, void 0, void 0, function* () {
        const harEntry = yield (0, util_1.loadHarEntryByUrl)('/auth');
        let req = harEntry.request;
        req.url = (0, util_1.getUrlWithParams)({
            url: req.url,
            params: {
                key
            }
        });
        req = (0, util_1.parseRequest)(req);
        req = yield (0, util_1.useCookiesFromBrowser)(req);
        // TODO : Use Cookies from Browser => Clean Code
        const res = yield (0, util_1.request)(req);
        yield (0, util_1.saveCookiesFromResponse)(res);
        return (0, util_1.lightResponse)(res);
    });
}
exports.authRequest = authRequest;
// authRequest({
// 	key: string
// });
