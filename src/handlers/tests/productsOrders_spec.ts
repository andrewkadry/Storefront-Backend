import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

let token : string;

describe('Product and Orders Tests', function() {

  
  beforeAll(async () => {
    
      const response = await request
      .post('/users/signup')
      .send({
        "username" : "andrewKadry",
        "firstname": "Andrew",
        "lastname" : "Kadry",
        "password" : "hellopassword123"
      })
      .set('Accept', 'application/json')
  
      token = response.body.token
      if(!token){
      const response2 = await request
      .post('/users/signin')
      .send({
        "username" : "andrewKadry",
        "password" : "hellopassword123"
      })
      .set('Accept', 'application/json')
  
      token = response2.body.token
      }  
})

  it('should add product to the database ', async function() {
    const response = await request
      .post('/products/create')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .send({
          "name" : "product1",
          "price" : 230
      })
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      "id": jasmine.any(Number),
      "name": "product1",
      "price": 230
    })
  });

  //this test will run the first time only because every user can have only one order
  it('should add order to the logged in user ', async function() {
    const response = await request
      .post('/orders/create')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .send({
          "status" : "active", 
      })
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      "id": jasmine.any(Number),
      "statusoforder": "active",
      "user_id": 1
    })
  });

  it('should add product to the order of the logged in user ', async function() {
    const response = await request
      .post('/orders/add')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+token)
      .send({
          "productid" : 1,
          "orderid" : 1,
          "quantity": 3
      })
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });

  it('show the order with products ', async function() {
    const response = await request
      .get('/orders/1')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+token)
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
  });

  
});