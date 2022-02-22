"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const product_1 = __importDefault(require("./handlers/product"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
const corsOptions = {
    origin: 'http://localhost/3000',
    optionSuccessStatus: 200
};
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//app.use(bodyParser.raw())
app.get('/', function (req, res) {
    res.send('Hello World!');
});
//app.use('/api',routes)
(0, product_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
