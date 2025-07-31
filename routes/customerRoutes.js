const express = require("express")
const router = express.Router()

const {createCustomer, getCustomerById} = require("../controllers/customerController")

router.post("/customers", createCustomer);
router.get("/customers/:id", getCustomerById);

module.exports = router;