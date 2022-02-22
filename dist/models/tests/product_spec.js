"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const prod = new product_1.Product();
describe("product Model", () => {
    it('should have an index method', () => {
        expect(prod.index).toBeDefined();
    });
    it('should have an show method', () => {
        expect(prod.show).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await prod.create({
            id: 1,
            name: 'product 1',
            price: 250.30,
        });
        expect(result).toEqual({
            id: 1,
            name: 'product 1',
            price: 250.30
        });
    });
    it('create method should delete a product', async () => {
        const result = await prod.delete(1);
        expect(result).toEqual(1);
    });
});
