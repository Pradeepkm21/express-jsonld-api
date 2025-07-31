const express = require("express")
const router = express.Router()

const {createCustomer} = require("../controllers/customerController")

router.post("/customers", createCustomer)

module.exports = router;