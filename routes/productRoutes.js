const express = require("express")
const router = express.Router()

const {createProduct, getProductById} = require("../controllers/productController");

router.post("/products", createProduct);
router.get("/products/:id", getProductById);

module.exports = router;