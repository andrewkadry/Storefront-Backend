# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index [token required]
- Show [token required]
- Create [token required]

#### Users
- Index [token required]
- Show [token required]
- signin
- signup
- 


#### Orders
- create order [token required]
- add product to order [token required]
- show Order by user (args: user id)[token required]

## Data Shapes
#### Product
-  id : number auto increment
- name : varchar
- price : Decimal
 
#### User
- id : number auto increment
- username : varchar unique
- firstName : varchar
- lastName : varchar
- password : varchar

#### Orders
- id : number auto increment
- user_id : number foreign key 
- status of order (active or complete) : varchar

### Order-item
- id: number auto increment
- quantity: integer number
- product_id : number foreign key
- order_id : number foreign key