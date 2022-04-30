"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const package_1 = require("@taccl/package");
const scripts = (0, package_1.writeScripts)(path_1.default.join(__dirname.replace(process.cwd(), ''), 'Config'));
console.log('scripts:');
console.log(scripts);
