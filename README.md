# JSON-LD Entity APIs Using Express.js and MongoDB

A RESTful API built with **Express.js** and **MongoDB** that supports **JSON-LD formatted entities** such as Customers, Products, and Orders.


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


