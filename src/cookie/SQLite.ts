import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
type Path = {
    path: string
}
async function openDB({ path }: Path) {
    const db = await open({
        filename: path,
        driver: sqlite3.Database
    })
    return db;
}

type Json = {
    [x: string]: string | Json;
}

type Select = {
    select?: string;
    set?: Json;
    table?: string;
    from?: string;
    where?: Json | string;
    filter?: Function;
}

function getTypeOfJson(w: any) {
    return typeof JSON.parse(JSON.stringify(w));
}

function getWhereFromJson(where: Json): string {
    if (typeof where == 'string') {
        throw new Error();
    }
    return Object.entries(where).map(([k, v]): string => {
        return ` WHERE '${k}' = '${v}' `;
    }).join('');
}

function getWhere({
    where
}: Select): string {
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

async function select(db: any, {
    select,
    from,
    filter
}: Select) {
    const cmd = (function () {
        const __select = ` SELECT ${select || '*'} `;
        const __from = ` FROM ${from || '*'} `;
        return __select + __from;
    })().trim();
    const result: any = await db.all(cmd);
    const filteredResult: any = result.filter((_: any) => ((filter ?? function (f: any) {
        return true;
    })(_)));
    return filteredResult;
}


async function update(db: any, {
    table,
    set,
    where
}: Select) {
    const cmd = (function () {
        const __table = table;
        const __set: any = Object.entries(set ?? { "": "" }).map(([k, v]): string => {
            return ` SET '${k}' = '${v}' `;
        }).join('');
        const __where = getWhere({ where });
        return `UPDATE ` + __table + __set + __where;
    })().trim();
    const _exec: string = await db.all(cmd);
    return _exec;
}

export { Path as DBPath, Select as DBSelect, select, update, openDB }