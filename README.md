## Storefront Backend Project

## project setup

### 1- Code : 

- run `npm install` to install all packages in the package.json file

- run `npm run build` to build the project

- run `npm run watch` to start the server

- run `npm run test` to run all tests


### 2- Database

- add `.env` file and add all your local params in it 

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
