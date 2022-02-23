import {product,Product} from '../product'

const prod = new Product();

describe("product Model", () => {
    let aaddedProductID : number;


      it('create method should add a product', async () => {
        const result = await prod.create({
          id: 2,
          name: 'product 1',
          price: 250.30,
        });
        expect(result).toEqual({
          id: jasmine.any(Number),
          name: 'product 1',
          price: 250.30
        });
        aaddedProductID = result.id;
      });

      it('show method should show a product', async () => {
        const result = await prod.show(aaddedProductID);
        expect(result).toEqual({
          id: aaddedProductID,
          name: 'product 1',
          price: 250.30
        });
      });

      it('index method should show all products', async () => {
        const result = await prod.index();
        expect(result).toEqual([
          {
            id: 1,
            name: 'product1',
            price: 230},
          {
            id: 2,
            name: 'product2',
            price: 1000},
          {
            id: aaddedProductID,
            name: 'product 1',
            price: 250.30
        }]);
      });

      it('delete method should delete a product', async () => {
        const result = await prod.delete(aaddedProductID);
        expect(result).toEqual(aaddedProductID);
});

});
