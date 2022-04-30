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
exports.loadHarEntryByUrl = exports.useCookiesFromBrowser = exports.parseRequest = exports.filterByReqUrl = exports.getEntries = exports.readHar = void 0;
const har_1 = require("./har");
const url_1 = require("url");
const Cookie_1 = require("./Cookie");
function readHar({ path }) {
    let har = path !== null && path !== void 0 ? path : (0, har_1.getHarPath)();
    har = (0, har_1.readHarFile)({
        path: har
    });
    har = (0, har_1.parseHar)({ har });
    return har;
}
exports.readHar = readHar;
function getEntries(har) {
    return har.log.entries;
}
exports.getEntries = getEntries;
function filterByReqUrl(harEntries, url) {
    if (harEntries instanceof Array) {
        return harEntries.filter((harEntry) => {
            var _b, _c, _f;
            return (_f = (_c = (_b = harEntry === null || harEntry === void 0 ? void 0 : harEntry.request) === null || _b === void 0 ? void 0 : _b.url) === null || _c === void 0 ? void 0 : _c.includes(url)) !== null && _f !== void 0 ? _f : false;
        });
    }
    throw new Error();
}
exports.filterByReqUrl = filterByReqUrl;
function parseRequest(request) {
    const fe = Object.fromEntries;
    const oe = Object.entries;
    const parseHeaders = function (headers) {
        if (headers instanceof Array) {
            const _h = headers.map((header) => {
                let { name, value } = header;
                if (name.includes('ccept')) {
                    value = value.replace('gzip,', '');
                }
                return [name, value];
            });
            return fe(_h);
        }
        throw new Error();
    };
    let url;
    let _e = oe(request).filter(([k, v]) => {
        if (k == 'url') {
            url = new url_1.URL(v);
        }
        switch (k) {
            case 'headersSize': return false;
            case 'bodySize': return false;
            case 'cookies': return false;
            case 'url': return false;
            default: return true;
        }
    });
    _e = oe((function () {
        const _d = fe(_e);
        try {
            _d.hostname = url.hostname;
            _d.path = (url.pathname) + (url.search);
            _d.port = url.port
                ? url.port
                : (function () {
                    switch (url.protocol) {
                        case 'https:': return 443;
                        case 'http:': return 80;
                    }
                    throw new Error();
                })();
        }
        catch (e) {
            return _d;
        }
        return _d;
    })());
    _e = _e.map(([k, v]) => {
        if (k == 'headers') {
            return [k, parseHeaders(v)];
        }
        return [k, v];
    });
    return fe(_e);
}
exports.parseRequest = parseRequest;
function useCookiesFromBrowser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let _cookie = req.headers.Cookie.split('; ').map((cookieStr) => __awaiter(this, void 0, void 0, function* () {
            // Use Cookies From Browser
            const _eq = cookieStr.indexOf('=');
            const cookieName = function (c) {
                return c.substring(0, _eq);
            };
            const cookieValue = function (c) {
                return __awaiter(this, void 0, void 0, function* () {
                    let _a = yield (0, Cookie_1.getCookies)({});
                    _a = _a.filter((cookie) => {
                        const { name } = cookie;
                        return name == cookieName(c);
                    })[0];
                    const { value } = _a;
                    return value;
                });
            };
            const name = cookieName(cookieStr);
            const value = yield cookieValue(cookieStr);
            return [name, value].join('=');
        }));
        _cookie = yield Promise.all(_cookie);
        req.headers.Cookie = _cookie.join('; ');
        return req;
    });
}
exports.useCookiesFromBrowser = useCookiesFromBrowser;
function loadHarEntryByUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const har = readHar({});
        const harEntries = getEntries(har);
        const harEntry = filterByReqUrl(harEntries, url)[0];
        return harEntry;
    });
}
exports.loadHarEntryByUrl = loadHarEntryByUrl;
