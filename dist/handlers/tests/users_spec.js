"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('Test api endpoint response', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});
let token;
describe('GET /users/id get user by id', function () {
    it('sign in ', async () => {
        const response = await request
            .post('/users/signin/')
            .send({
            "username": "andrewKadry",
            "password": "hellopassword123"
        })
            .set('Accept', 'application/json');
        token = response.body.token;
    });
    it('users', async function () {
        const response = await request
            .get('/users/1')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            "id": jasmine.any(Number),
            "username": "andrewKadry",
            "firstname": "Andrew",
            "lastname": "Kadry",
            "password": jasmine.any(String),
        });
    });
});
