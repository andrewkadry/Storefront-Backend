"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var product_1 = __importDefault(require("./api/product"));
var routes = express_1["default"].Router();
routes.get('/', function (req, res) {
    res.send('main api route');
});
routes.use('/product', product_1["default"]);
exports["default"] = routes;
