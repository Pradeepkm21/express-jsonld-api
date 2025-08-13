const mongoose  = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

const customerModel = require("../models/customerModel");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

exports.createOrder = async(req, res)=>{
    try{
        const orderData = req.body;

        if(orderData["@type"] !== "Order"){
            return res.status(400).json("Invalid @type : expected 'Order'");
        }

        // Validate presence of customerID and productID
        if (!orderData.customerID?.["@id"] || !orderData.productID?.["@id"]){
            return res.status(400).json({ error: "customerID and productID are required" });
        }

        const customerId = orderData.customerID["@id"].split('/').pop();
        const productId = orderData.productID["@id"].split('/').pop();

        if (!ObjectId.isValid(customerId) || !ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid customerID or productID format" });
        }

        const customer = await customerModel.findById(customerId);
        const product = await productModel.findById(productId);

        if(!customer || !product){
            return res.status(404).json({ error: "Referenced customer or product not found" })
        }
        
        const order = await orderModel.create({
            customerID : customerId,
            productID : productId,
            quantity : orderData.quantity || 1,
            date : orderData.date ? new Date(orderData.date) : new Date(),
        });


        res.status(201).json({
            "@context" : "http://schema.org",
            "@type" : "Order",
            "@id" : `${req.protocol}://${req.get("host")}/orders/${order._id}`,
            customerID : {
                "@id" : `${req.protocol}://${req.get("host")}/customers/${customerId}`
            },
            productID : {
                "@id" : `${req.protocol}://${req.get("host")}/products/${productId}`
            },
            quantity : order.quantity,
            date : order.date,
        });
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
};

exports.getOrderById = async(req, res) => {
    try{
        const {id} = req.params;

        if(!id || !ObjectId.isValid(id)){
            return res.status(400).json({error : "Valid ID is required"});
        }

        const order = await orderModel.findById(id);
        if(!order){
            return res.status(404).json({error : "Order not found"});
        }

        res.status(200).json({
            "@context" : "https://schema.org",
            "@type" : "Order",
            "@id" : `${req.protocol}://${req.get("host")}/orders/${order._id}`,
            customerID : {
                "@id" : `${req.protocol}://${req.get("host")}/customers/${order.customerID}`
            },
            productID : {
                "@id" : `${req.protocol}://${req.get("host")}/products/${order.productID}`
            },
            quantity : order.quantity,
            date : order.date,
        });
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
}