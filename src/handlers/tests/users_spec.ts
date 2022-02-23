import supertest from 'supertest';
import { isExportDeclaration } from 'typescript';
import app from '../../server';

const request = supertest(app);
describe('Test api endpoint response', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});

let token : string;

describe('GET /users/id get user by id', function() {



it('sign in ' , async () => {
  const response = await request
  .post('/users/signin/')
  .send({
    "username" : "andrewKadry",
    "password" : "hellopassword123"
  })
  .set('Accept', 'application/json')

  token = response.body.token
})

  

  it('get user by id', async function() {
    const response = await request
      .get('/users/1')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+token)
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      "id": jasmine.any(Number),
      "username": "andrewKadry",
      "firstname": "Andrew",
      "lastname": "Kadry",
      "password": jasmine.any(String),
    })
  });

  it('get all users', async function() {
    const response = await request
      .get('/users')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer '+token)
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{
      "id": jasmine.any(Number),
      "username": "andrewKadry",
      "firstname": "Andrew",
      "lastname": "Kadry",
      "password": jasmine.any(String),
    }])
  });

});

