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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.standbyRequest = void 0;
const util_1 = require("../util");
const querystring_1 = __importDefault(require("querystring"));
/**
 * @params { orgCd,sid }
 * @returns
 * @statusCode 302
 * @Location
 * 	/nidlogin.login
 * 		=> LoginException
 * 	/auth?key=${key}
 * 		=> Success
 * @Headers
 * 	@SetCookie
 * 		@NID_SES
 * 			*expire*
 * 				=> Cookie expired
 *
 */
function standbyRequest({ orgCd, sid }) {
    return __awaiter(this, void 0, void 0, function* () {
        const harEntry = yield (0, util_1.loadHarEntryByUrl)('/reservation');
        let options = harEntry.request;
        const url = new URL(options === null || options === void 0 ? void 0 : options.url);
        const { host, protocol, pathname, search } = url;
        const query = Object.assign(querystring_1.default.parse(search === null || search === void 0 ? void 0 : search.replace('?', '')), { orgCd, sid });
        const path = [pathname, querystring_1.default.stringify(query)]
            .join('?');
        options = Object.assign(Object.fromEntries(Object.entries(options)
            .filter(([k, v]) => (k != 'url'))), { host, protocol, path });
        options = (0, util_1.parseRequest)(options);
        options = yield (0, util_1.useCookiesFromBrowser)(options);
        // TODO : Use Cookies from Browser => Clean Code
        const res = yield (0, util_1.request)(options);
        yield (0, util_1.saveCookiesFromResponse)(res);
        return (0, util_1.lightResponse)(res);
    });
}
exports.standbyRequest = standbyRequest;
// standbyRequest({
// 	orgCd: string | number,
// 	sid: string | number
// });
