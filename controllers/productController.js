const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const productModel = require("../models/productModel");

exports.createProduct = async(req, res) =>{
    try{
        const productData = req.body;

        if(productData["@type"] != "Product"){
            return res.status(400).json("Invalid @type : expected 'Product'");
        }

        if(!productData.name || !productData.category){
            return res.status(400).json("Invalid name or category field");
        }

        const product = await productModel.create({
            name : productData.name,
            category : productData.category,
            price : productData.price,
        });

        res.status(201).json({
            "@context" : "http://schema.org",
            "@type" : "Product",
            "@id" : `${req.protocol}://${req.get("host")}/products/${product._id}`,
            name : productData.name,
            category : productData.category,
            price : productData.price,
        })
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
};


exports.getProductById = async(req, res) =>{
    try{
        const {id} = req.params;

        if(!id || !ObjectId.isValid(id)){
            return res.status(400).json({error : "Valid ID is required"});
        }

        const product = await productModel.findById(id);
        if(!product){
            return res.status(404).json({error : "Product not found"});
        }

        res.status(200).json({
            "@context" : "https://schema.org",
            "@type" : "Product",
            "@id" : `${req.protocol}://${req.get("host")}/products/${product._id}`,
            name : product.name,
            category : product.category,
            price : product.price,
        });
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
}