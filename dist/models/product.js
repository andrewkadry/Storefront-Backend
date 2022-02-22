"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
class Product {
    async index() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`error while connecting to product table ${err}`);
        }
    }
    async show(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM product WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`error while getting this product ${err}`);
        }
    }
    async create(p) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO product (name,price) VALUES ($1,$2) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            result.rows[0].price = Number(result.rows[0].price);
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`error while creating this product ${err}`);
        }
    }
    async delete(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM product WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return id;
        }
        catch (err) {
            throw new Error(`error while deleting this product ${err}`);
        }
    }
}
exports.Product = Product;
