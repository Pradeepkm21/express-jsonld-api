const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const customerModel = require("../models/customerModel");

exports.createCustomer = async (req, res)=>{
    try{
        const customerData = req.body;
        
        if(customerData["@type"] != "Person"){
            return res.status(400).json("Invalid @type : expected 'Person'");
        }

        if(!customerData.name || !customerData.email){
            return res.status(400).json("Invalid name or email fields");
        }

        const customer = await customerModel.create({
            name : customerData.name,
            email : customerData.email,
        });

        res.status(201).json({
            "@context" : "http://schema.org",
            "@type" : "Person",
            "@id" : `${req.protocol}://${req.get("host")}/customers/${customer._id}`,
            name : customerData.name,
            email : customerData.email,
        });
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
}

exports.getCustomerById = async(req, res)=>{
    try{
        const {id} = req.params;
        if(!id || !ObjectId.isValid(id)){
            return res.status(400).json({error : "Valid ID is required"});
        }
        
        const customer = await customerModel.findById(id);
        if(!customer){
            return res.status(404).json({error : "Customer not found"});
        }

        res.status(200).json({
            "@context" : "https://schema.org",
            "@type" : "Person",
            "@id" : `${req.protocol}://${req.get("host")}/customers/${customer._id}`,
            name : customer.name,
            email : customer.email,
        });
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
}