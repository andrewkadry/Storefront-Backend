"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ord = new orders_1.Order();
const create = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decodedToken = (0, jwt_decode_1.default)(token);
        const o = {
            id: 1,
            statusoforder: req.body.status,
            user_id: decodedToken.id
        };
        const neword = await ord.create(o);
        res.json(neword);
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const addProductToOrder = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const op = {
            productId: Number(req.body.productid),
            orderId: Number(req.body.orderid),
            quantity: Number(req.body.quantity)
        };
        const newprodtoord = await ord.addProductToOrder(op);
        res.json(newprodtoord);
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const show = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const order1 = await ord.showOrder(Number(req.params.user_id));
        const prods1 = await ord.showOrderProducts(order1.id);
        const oprods = {
            status: order1.statusoforder,
            userId: order1.user_id,
            products: prods1
        };
        res.json(oprods);
    }
    catch {
        res.status(400);
        res.json('sorry cant get product with this id');
    }
};
const orders_routes = (app) => {
    app.post('/orders/create', create);
    app.post('/orders/add/', addProductToOrder);
    app.get('/orders/:user_id', show);
};
exports.default = orders_routes;
