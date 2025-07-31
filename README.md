# JSON-LD Entity APIs Using Express.js and MongoDB

A RESTful API built with **Express.js** and **MongoDB** that supports **JSON-LD formatted entities** such as Customers, Products, and Orders.


## Set-up and run instructions
1. Clone the repository
- git clone https://github.com/pradeepkm21/express-jsonld-api.git
- cd express-jsonld-api

2. Install dependencies
- npm install

3. configure Envirement `.env`
- MONGO_URI=mongodb://localhost:27017/shopDB
- PORT=3000

4. Run server
- npm start


## Steps involve in this project

### Project Initialization
- Node.js environment set up using `npm init -y`
- Basic project folder structure established:
  - `routes/`, `controllers/`, `models/`
  - Main file: `index.js`
  - `.gitignore` created to exclude `node_modules` and `.env`

### Dependencies Installed
- `express`, `mongodb`, `dotenv`, `body-parser`
- `nodemon` installed as a dev dependency

### GitHub Repository
- Git initialized locally and pushed to GitHub

### Express App Setup
- Middleware configured using `express.json()` for json parsing
- Base GET route (`/`) implemented and tested
- POST routes created for:
  - `/customers`
  - `/products`
  - `/orders`
- Routes and Controllers folders are created for reuse and modular programming


### MongoDB connected and Controller logic written
- DB connected with MongoDB server
- Controllers logic for customers, products and orders has written successfully
  - As request, JSON-LD data is given 
  - DB stores only neccessary data, avoid metadata
  - Return JSON-LD data as response
- Endpoints are tested using sample data


### MongoDB data structure examples
- Customer document
{
  "_id": ObjectId("688af7cf55da7a2e00a48daf"),
  "name": "MxWeb",
  "email": "mxweb@google.com"
}

- Product document
{
  "_id": ObjectId("688af7cf55da7a2e00a48daf"),
  "name" : "Data structure and Algorithm",
  "category" : "Book",
  "price" : 3000
}

- Order document
{
  "_id": ObjectId('688b060ab48e78b708ca8174'),
  "customer_id": ObjectId('688af63ec4ee559f8f4b3ee7'),
  "product_id": ObjectId('68889ca537c27f41139de67c'),
  "quantity": 1,
  "date": "28-07-2025"
}


### JSON-LD formatted sample Data for endpoints
- Sample request body with api routes : 

- `POST/customers`
{ 
  "@context" : "https://schema.org",
  "@type" : "Person",
  "name" : "Pradeep", 
  "email" : "pradeep@gmail.com"
}

- `POST/products`
{ 
  "@context" : "https://schema.org",
  "@type" : "Product",
  "name" : "Data structure and Algorithm",
  "category" : "Book",
  "price" : 3000
}

- `POST/orders`
{
    "@context": "https://schema.org",
    "@type": "Order",
    "date": "28-07-2025",
    "quantity": 3,
    "customer_id": {
      "@id": "http://localhost:3000/customers/688af7cf55da7a2e00a48daf"
    },
    "product_id": {
      "@id": "http://localhost:3000/products/688af7cf55da7a2e00a48daf"
    }
}


### Retrieval(GET) endpoints
- Created GET endpoints to retrieve document using id
- These endpoints return response as JSON-LD entity

- Sample response for its routes are given :

- `GET/customers/:id` 
{
  "@context": "http://schema.org",
  "@type": "Customer",
  "@id": "http://localhost:4000/customers/688af7cf55da7a2e00a48daf",
  "name": "MxWeb",
  "email": "mxweb@google.com"
}

- `GET/products/:id`
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "http://localhost:3000/products/6887c6f7763712bc4b2e2997",
  "name": "Pen",
  "category": "stationary",
  "price": 10
}

- `GET/orders/:id`
{
  "@context": "https://schema.org",
  "@type": "Order",
  "@id": "http://localhost:3000/orders/688b01a185f762bdd77ecf0d",
  "quantity": 2,
  "date": "20-07-2025",
  "customer_id": {
    "@id": "http://localhost:3000/customers/68889c3337c27f41139de67a"
  },
  "product_id": {
    "@id": "http://localhost:3000/products/68889cf437c27f41139de67d"
  }
}




