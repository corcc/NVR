"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scripts = void 0;
exports.scripts = {
    config: {
        scripts: "ts-node ./config/scripts"
    },
    build: {
        tsc: "tsc",
        dist: "tsc"
    },
    lint: {
        fix: "eslint --fix --ext .ts,.tsx .",
        run: "eslint --ext .ts,.tsx ."
    }
};
