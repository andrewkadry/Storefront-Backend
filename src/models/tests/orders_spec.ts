import {order,Order} from '../orders'
import {user,User} from '../users'

const ord = new Order();
const use = new User();
let userID :number;
let orderID : number;
describe("Ordesrs Model", () => {

    beforeAll(async () => {
        const result = await use.create({
            id: 0,
            username: "andrewOrder",
            firstname: "andrew",
            lastname: "wagih",
            password: "testordermodelpassword"
          });
          userID = result.id
    })
    

      it('create method should create order', async () => {
        const result = await ord.create({
          id: 0,
          statusoforder: 'active',
          user_id: userID
        });
        expect(result).toEqual({
          id: jasmine.any(Number),
          statusoforder: 'active',
          user_id: userID
        });
        orderID = result.id;
      });

      it('addProductToTrder method should add product to order', async () => {
        const result = await ord.addProductToOrder({
            id:0,
            quantity: 9,
            product_id: 1,
            order_id: orderID
          });
          expect(result).toEqual({
            id : jasmine.any(Number),
            quantity: 9,
            product_id: 1,
            order_id: orderID
          });
        });

        it('showOrder method should show order by user id', async () => {
          const result = await ord.showOrder(userID);
            expect(result).toEqual({
              id : jasmine.any(Number),
              statusoforder: 'active',
              user_id: userID
            });
          });

          it('showOrderProducts method should show products by order id', async () => {
            const result = await ord.showOrderProducts(orderID);
              expect(result).toEqual([{
                id : jasmine.any(Number),
                quantity: 9,
                product_id: 1,
                order_id: orderID
              }]);
            });

});
