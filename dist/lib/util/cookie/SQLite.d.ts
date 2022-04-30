/// <reference types="./vendor-typings/sqlite3" />
import sqlite3 from 'sqlite3';
import { DBPath, DBSelect } from '../type';
export declare function openDB({ path }: DBPath): Promise<import("sqlite").Database<sqlite3.Database, sqlite3.Statement>>;
export declare function select(db: any, { select, from, filter }: DBSelect): Promise<any>;
export declare function update(db: any, { table, set, where }: DBSelect): Promise<void>;
