const { ObjectId } = require("mongodb");
const {getDB} = require("../config/db");

exports.createOrder = async(req, res)=>{
    try{
        const db = getDB();
        const orderData = req.body;

        if(orderData["@type"] != "Order"){
            return res.status(400).json("Invalid @type : expected 'Order'");
        }

        // Validate presence of customer_id and product_id
        if (!orderData["customer_id"] || !orderData["customer_id"]["@id"] || !orderData["product_id"] || !orderData["product_id"]["@id"]){
            return res.status(400).json({ error: "customer_id and product_id are required" });
        }

        let customerID, productID;
        try {
            customerID = new ObjectId(orderData["customer_id"]["@id"].split('/').pop());
            productID = new ObjectId(orderData["product_id"]["@id"].split('/').pop());
        }catch (err) {
            return res.status(400).json({ error: "Invalid customer_id or product_id format" });
        }

        const customer = await db.collection("customers").findOne({_id : customerID});
        const product = await db.collection("products").findOne({_id : productID});

        if(!customer || !product){
            return res.status(404).json({ error: "Referenced customer or product not found" })
        }

        const result = await db.collection("orders").insertOne({
            "customer_id" : customerID,
            "product_id" : productID,
            "quantity" : orderData["quantity"] || 1,
            "date" : orderData["date"] || new Date()
        });

        const orderID = result.insertedId;

        res.status(201).json({
            "@context" : "http://schema.org",
            "@type" : "Order",
            "@id" : `${req.protocol}://${req.get("host")}/orders/${orderID}`,
            "customer_id" : {
                "@id" : `${req.protocol}://${req.get("host")}/customers/${customerID}`
            },
            "product_id" : {
                "@id" : `${req.protocol}://${req.get("host")}/products/${productID}`
            },
            "quantity" : orderData["quantity"] || 1,
            "date" : orderData["date"] || new Date()
        });
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
}

exports.getOrderById = async(req, res) => {
    try{
        const db = getDB();
        const {id} = req.params;

        if(!id){
            return res.status(400).json({error : "Valid ID is required"});
        }

        const order = await db.collection("orders").findOne({_id : new ObjectId(id)});
        if(!order){
            return res.status(404).json({error : "Order not found"});
        }

        res.status(200).json({
            "@context" : "https://schema.org",
            "@type" : "Order",
            "@id" : `${req.protocol}://${req.get("host")}/orders/${order._id}`,
            "quantity" : order.quantity,
            "date" : order.date,
            "customer_id" : {
                "@id" : `${req.protocol}://${req.get("host")}/customers/${order.customer_id}`
            },
            "product_id" : {
                "@id" : `${req.protocol}://${req.get("host")}/products/${order.product_id}`
            }
        });
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
}