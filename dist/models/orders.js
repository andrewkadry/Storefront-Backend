"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
//@ts-ignore
const database_1 = __importDefault(require("../database"));
class Order {
    async showOrder(user_id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
            const result = await conn.query(sql, [user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`error while getting order ${err}`);
        }
    }
    async showOrderProducts(id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM order_item WHERE order_id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`error while showing this order ${err}`);
        }
    }
    async create(o) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (statusoforder,user_id) VALUES ($1,$2) RETURNING *';
            const result = await conn.query(sql, [o.statusoforder, o.user_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`error while creating this product ${err}`);
        }
    }
    async addProductToOrder(op) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_item (quantity,product_id,order_id) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [op.quantity, op.productId, op.orderId]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`error while adding this product to the order ${err}`);
        }
    }
}
exports.Order = Order;
