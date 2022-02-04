"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHarPath = void 0;
const fs_1 = require("fs");
const cwd = process.cwd();
function getHarPath() {
    let l = (0, fs_1.readdirSync)(cwd);
    l = l.filter((v) => (v.includes('.har')));
    if (!l[0]) {
        throw new Error('Cannot Find Har File');
    }
    return `${cwd}/${l[0]}`;
}
exports.getHarPath = getHarPath;
