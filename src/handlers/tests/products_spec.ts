import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let token : string;
let productID : number;

describe('Product Tests', function() {

  
  beforeAll(async () => {
      
      const response2 = await request
      .post('/users/signin')
      .send({
        "username" : "andrewKadry",
        "password" : "hellopassword123"
      })
      .set('Accept', 'application/json')
  
      token = response2.body.token
})

  it('should add product to the database ', async function() {
    const response = await request
      .post('/products/create')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .send({
          "name" : "product2",
          "price" : 1000
      })
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      "id": jasmine.any(Number),
      "name": "product2",
      "price": 1000
    })
    productID = response.body.id;
  });


    it('should view a product with', async function() {
        const response = await request
          .get('/products/'+productID)
          .set('Accept', 'application/json')
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
          "id": productID,
          "name": "product2",
          "price": "1000"
        })
  });

  

  
});