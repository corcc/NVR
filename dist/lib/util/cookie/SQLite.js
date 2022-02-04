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
exports.update = exports.select = exports.openDB = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
function getTypeOfJson(w) {
    return typeof JSON.parse(JSON.stringify(w));
}
function getWhereFromJson(where) {
    if (typeof where === 'string') {
        throw new Error();
    }
    return Object.entries(where).map(([k, v]) => {
        return ` WHERE ${k} = '${v}' `;
    }).join('');
}
function getWhere({ where }) {
    const whereType = getTypeOfJson(where);
    switch (whereType) {
        case 'object': return (function (w) {
            const _w = JSON.parse(JSON.stringify(w));
            return getWhereFromJson(_w);
        })(where);
        case 'string': return `${where}`;
        default: throw new Error();
    }
}
function openDB({ path }) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, sqlite_1.open)({
            filename: `${path}`,
            mode: sqlite3_1.default.OPEN_READWRITE,
            driver: sqlite3_1.default.Database
        });
        return db;
    });
}
exports.openDB = openDB;
function select(db, { select, from, filter }) {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = (function () {
            const __select = ` SELECT ${select || '*'} `;
            const __from = ` FROM ${from || '*'} `;
            return __select + __from;
        })().trim();
        let result = yield db.all(cmd);
        if (filter) {
            result = result.filter((_) => filter(_));
        }
        return result;
    });
}
exports.select = select;
function update(db, { table, set, where }) {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = (function () {
            const __table = table;
            const __set = Object.entries(set !== null && set !== void 0 ? set : { '': '' }).map(([k, v]) => {
                return ` SET ${k} = '${v}' `;
            }).join('');
            const __where = getWhere({ where });
            return 'UPDATE ' + __table + __set + __where;
        })().trim();
        yield db.run(cmd);
    });
}
exports.update = update;
