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
exports.setCookies = exports.getCookies = void 0;
const cookie_1 = require("./cookie");
const Parse_1 = require("./cookie/Parse");
let db;
const cookieFilter = {
    naver: function (cookie) {
        if (typeof cookie.host == 'undefined') {
            throw new Error();
        }
        return cookie.host.match(/.*n*aver*/);
    }
};
function getCookies({ filter }) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = (0, cookie_1.getCookiePath)();
        db = yield (0, cookie_1.openDB)({
            path
        });
        const options = {
            from: 'moz_cookies',
            filter: filter !== null && filter !== void 0 ? filter : cookieFilter.naver
        };
        let result = yield (0, cookie_1.selectDB)(db, options);
        result = result.map((c) => (0, Parse_1.parseCookie)(c));
        return result;
    });
}
exports.getCookies = getCookies;
function setCookies({ cookies }) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = (0, cookie_1.getCookiePath)();
        db = yield (0, cookie_1.openDB)({
            path
        });
        if (typeof cookies === 'undefined') {
            throw new Error();
        }
        const result = yield cookies.map((cookie) => __awaiter(this, void 0, void 0, function* () {
            const options = {
                table: 'moz_cookies',
                set: {
                    value: cookie.value
                },
                where: {
                    name: cookie.name
                }
            };
            yield (0, cookie_1.updateDB)(db, options);
            let result = yield getCookies({});
            result = result.filter((c) => {
                return c.name == cookie.name;
            });
            return result;
        }));
        return result;
    });
}
exports.setCookies = setCookies;
