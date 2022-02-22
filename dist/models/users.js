"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, HASH_ROUND } = process.env;
class User {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`error while connecting to users table ${err}`);
        }
    }
    async show(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`error while getting this user ${err}`);
        }
    }
    async create(u) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (username,firstname,lastname,password) VALUES ($1,$2,$3,$4) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + BCRYPT_PASSWORD, parseInt(HASH_ROUND));
            const result = await conn.query(sql, [u.username, u.firstname, u.lastname, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(` ${err}`);
        }
    }
    async authenticate(username, password) {
        //@ts-ignore
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE username=($1)';
        const result = await conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                return user;
            }
        }
        return null;
    }
    async delete(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`error while deleting this user ${err}`);
        }
    }
}
exports.User = User;
