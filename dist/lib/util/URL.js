"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProgressURL = exports.getUrlWithParams = exports.getParsedSearchParams = exports.getSearchParams = exports.getURL = void 0;
const url_1 = require("url");
const fe = Object.fromEntries;
function getURL(url) {
    return url instanceof url_1.URL ? url : new url_1.URL(url);
}
exports.getURL = getURL;
function getSearchParams(url) {
    return (function (_u) {
        let { search } = _u;
        search = (function (s) {
            return s.startsWith('?') ? s.replace('?', '') : s;
        })(search);
        return search;
    })(getURL(url));
}
exports.getSearchParams = getSearchParams;
function getParsedSearchParams({ url, search }) {
    const parse = function (s) {
        const e = (s.startsWith('?') ? s.replace('?', '') : s).split('&').map((p) => {
            const eq = p.indexOf('=');
            const n = p.substring(0, eq);
            const v = p.substring(eq + 1, p.length);
            return [n, v];
        });
        return fe(e);
    };
    if (search) {
        return parse(search);
    }
    if (url) {
        return (function (_u) {
            return parse(getSearchParams(_u));
        })(getURL(url));
    }
    throw new Error();
}
exports.getParsedSearchParams = getParsedSearchParams;
function getUrlWithParams({ url, params }) {
    const _url = (function (_u) {
        const { protocol, hostname, pathname } = new url_1.URL(_u);
        const _a = `${protocol}//${hostname}${pathname}`;
        return _a;
    })(url);
    return `${_url}` + ((params && params != {})
        ? ('?' + Object.entries(params).map(([k, v]) => {
            return [k, v].join('=');
        }).join('&'))
        : '');
}
exports.getUrlWithParams = getUrlWithParams;
function getProgressURL({ url, params }) {
    const _url = (function (_u) {
        const { protocol, hostname, pathname } = new url_1.URL(_u);
        const _a = `${protocol}//${hostname}${(function (p) {
            const _s = p.lastIndexOf('/');
            const _r = p.substring(_s, p.length);
            const _a = p.replace(_r, '/progress');
            return _a;
        })(pathname)}`;
        return _a;
    })(url);
    return getUrlWithParams({
        url: _url,
        params
    });
}
exports.getProgressURL = getProgressURL;
