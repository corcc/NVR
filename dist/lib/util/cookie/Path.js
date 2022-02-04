"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookiePath = void 0;
const Env_1 = require("../Env");
const path_1 = require("path");
const fs_1 = require("fs");
const HOME = (0, Env_1.getEnv)('HOME');
const firefoxPrefix = (function () {
    return (0, path_1.resolve)((0, path_1.join)(HOME, '.mozilla/firefox/'));
})();
function getCookiePath() {
    const paths = (0, fs_1.readdirSync)(firefoxPrefix);
    const devEditionDefaultPath = (function () {
        const dir = paths.filter((_) => (_.includes('dev-edition')))[0];
        const full = (0, path_1.resolve)((0, path_1.join)(firefoxPrefix, dir));
        return full;
    })();
    return `${devEditionDefaultPath}/cookies.sqlite`;
}
exports.getCookiePath = getCookiePath;
