"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHarFile = void 0;
const fs_1 = require("fs");
function readHarFile({ path }) {
    return (0, fs_1.readFileSync)(`${path}`).toString();
}
exports.readHarFile = readHarFile;
