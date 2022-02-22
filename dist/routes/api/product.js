"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../../models/product");
const product_routes = express_1.default.Router();
const prod = new product_1.Product();
const index = async (req, res) => {
    console.log(req.query.id, 'helloooo index api');
    const prods = await prod.index();
    res.json(prods);
};
const show = async (req, res) => {
    console.log(req.params.id, 'helloooo show api');
    const prods1 = await prod.show(Number(req.params.id));
    res.json(prods1);
};
product_routes.get('/', index);
product_routes.get('/:id', show);
exports.default = product_routes;
