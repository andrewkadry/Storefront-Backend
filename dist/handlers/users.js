"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userI = new users_1.User();
const index = async (req, res) => {
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
        const users = await userI.index();
        res.json(users);
    }
    catch {
        res.status(400);
        res.json('sorry cant get users');
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
        const users = await userI.show(Number(req.params.id));
        res.json(users);
    }
    catch {
        res.status(400);
        res.json('sorry cant get user with this id');
    }
};
const signup = async (req, res) => {
    try {
        const newUser = {
            id: 0,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const result = await userI.create(newUser);
        var token = jsonwebtoken_1.default.sign({ 'username': result.username, 'id': result.id }, process.env.TOKEN_SECRET);
        res.json({ "token": token });
    }
    catch (err) {
        res.status(400);
        res.json(`${err}`);
    }
};
const signin = async (req, res) => {
    const usern = req.body.username;
    const pass = req.body.password;
    const result = await userI.authenticate(usern, pass);
    if (result) {
        var token = jsonwebtoken_1.default.sign({ "username": result.username, "id": result.id }, process.env.TOKEN_SECRET);
        res.json({ "token": token });
    }
    else {
        res.json("user not found");
        res.status(404);
    }
};
const users_routes = (app) => {
    app.get('/users/:id', show);
    app.get('/users', index);
    app.post('/users/signup/', signup);
    app.post('/users/signin/', signin);
};
exports.default = users_routes;
