const {getDB} = require("../config/db");

exports.createCustomer = async (req, res)=>{
    try{
        const db = getDB();
        const customerData = req.body;
        
        if(customerData["@type"] != "Person"){
            return res.status(400).json("Invalid @type : expected 'Person'");
        }

        if(!customerData['name'] || !customerData['email']){
            return res.status(400).json("Invalid name or email fields");
        }

        const result = await db.collection("customers").insertOne({
            "name" : customerData["name"],
            "email" : customerData["email"]
        })

        const customerID = result.insertedId;

        res.status(201).json({
            "@context" : "http://schema.org",
            "@type" : "Person",
            "@id" : `${req.protocol}://${req.get("host")}/customers/${customerID}`,
            "name" : customerData["name"],
            "email" : customerData["email"]
        });
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
}