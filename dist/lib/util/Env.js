"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
function getEnv(env) {
    const _env = process.env[env];
    if (typeof _env !== 'string') {
        throw new Error();
    }
    return `${process.env[env]}`;
}
exports.getEnv = getEnv;
