## Storefront Backend Project

## project setup

### 1- Code : 

- run `npm install` to install all packages in the package.json file

- run `npm run build` to build the project

- run `npm run watch` to start the server

- run `npm run test` to run all tests

- Server port number `3000`

- DATABASE port number  `5432`


### 2- Database

- add `.env` file and add all your local params in it 
**Example**
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
BCRYPT_PASSWORD=bcrypt_password
HASH_ROUND=10
TOKEN_SECRET=token_secret
ENV=dev
```

- create user by `CREATE USER shopping_user WITH PASSWORD 'password123';`
- create dev database `CREATE DATABASE shopping;`
- connect to database `\c shopping`
- give access to the user `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`

- create test database `CREATE DATABASE shopping_test;`
- connect to database `\c shopping_test`
- give access to the user `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`




- run `db-migrate up` to make all the migrations and build the database

## Endpoints

### 1- Users endpoint

- `POST` : `/users/signup`.<br />
**No authentication required**,<br />
**request body should be a json that contains** : 
``` 
{
    "username" : "Replace with the username",
    "firstname" : "Replace with the firstname",
    "lastname" : "Replace with the firstname",
    "password": "Replace with the password"  
}
```
- `POST` : `/users/signin`<br />
**No authentication required** <br />
**request body should be a json that contains** : 

``` 
{
    "username" : "Replace with the username",
    "password": "Replace with the password"  
}
```

- `GET` : `/users/`<br />
**It requires a token and it uses the Bearer authentication Method**<br />
**No request body needed**<br />

- `GET` : `/users/:id`<br />
**It requires a token and it uses the Bearer authentication Method**<br />
**No request body needed you just need to pass the id in the URL**<br />

### 2- Products Endpoint

- `POST` : `/products/create`.<br />
**It requires a token and it uses the Bearer authentication Method**,<br />
**request body should be a json that contains** : 
``` 
{
    "name" : "Replace with the product name",
    "price" : Replace with the price number
}
```

- `GET` : `/products/`<br />
**It requires a token and it uses the Bearer authentication Method**<br />
**No request body needed**<br />
**Returns all products in the Database**

- `GET` : `/products/:id`<br />
**It requires a token and it uses the Bearer authentication Method**<br />
**No request body needed you just need to pass the id in the URL**<br />
**Returns product of the passed ID**

### 3- orders Endpoint

- `POST` : `/orders/create`.<br />
**It requires a token and it uses the Bearer authentication Method**,<br />
**the order will be created with the logged in user_id from the token provided**<br />
**request body should be a json that contains** : 
``` 
{
    "status" : "active | complete"
}
```

- `POST` : `/orders/add`.<br />
**It requires a token and it uses the Bearer authentication Method**,<br />
**request body should be a json that contains** : 
``` 
{
    "productid" : Replace with product id,
    "orderid" : Replace with the order id,
    "quantity" :  Replace with the quantity
}
```

- `GET` : `/orders/:user_id`<br />
**It requires a token and it uses the Bearer authentication Method**<br />
**No request body needed**<br />
**Returns order of the user with id passed in the URL**
