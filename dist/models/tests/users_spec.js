"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const use = new users_1.User();
describe("product Model", () => {
    it('should have an index method', () => {
        expect(use.index).toBeDefined();
    });
    it('should have an show method', () => {
        expect(use.show).toBeDefined();
    });
});
