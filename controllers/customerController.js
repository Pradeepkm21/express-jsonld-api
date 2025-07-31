const { ObjectId } = require("mongodb");
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

exports.getCustomerById = async(req, res)=>{
    try{
        const db = getDB();
        const {id} = req.params;

        if(!id){
            return res.status(400).json({error : "Valid ID is required"});
        }

        const customer = await db.collection("customers").findOne({_id : new ObjectId(id)});
        if(!customer){
            return res.status(404).json({error : "Customer not found"});
        }

        res.status(200).json({
            "@context" : "https://schema.org",
            "@type" : "Person",
            "@id" : `${req.protocol}://${req.get("host")}/customers/${customer._id}`,
            "name" : customer.name,
            "email" : customer.email
        });
    }
    catch(err){
        console.error("Error occured", error);
        res.status(500).json({error : "Internal server error"});
    }
}