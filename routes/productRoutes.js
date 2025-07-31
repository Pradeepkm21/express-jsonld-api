const express = require("express")
const router = express.Router()

const {createProduct} = require("../controllers/productController");

router.post("/products", createProduct);

module.exports = router;