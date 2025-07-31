const { ObjectId } = require("mongodb");
const {getDB} = require("../config/db");

exports.createProduct = async(req, res) =>{
    try{
        const db = getDB();
        const productData = req.body;

        if(productData["@type"] != "Product"){
            return res.status(400).json("Invalid @type : expected 'Product'");
        }

        if(!productData["name"] || !productData["category"]){
            return res.status(400).json("Invalid name or category field");
        }

        const result = await db.collection("products").insertOne({
            "name" : productData["name"],
            "category" : productData["category"],
            "price" : productData["price"] || 0
        });

        const productID = result.insertedId;

        res.status(201).json({
            "@context" : "http://schema.org",
            "@type" : "Product",
            "@id" : `${req.protocol}://${req.get("host")}/products/${productID}`,
            "name" : productData["name"],
            "category" : productData["category"],
            "price" : productData["price"]
        })
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
}


exports.getProductById = async(req, res) =>{
    try{
        const db = getDB();
        const {id} = req.params;

        if(!id){
            return res.status(400).json({error : "Valid ID is required"});
        }

        const product = await db.collection("products").findOne({_id : new ObjectId(id)});
        if(!product){
            return res.status(404).json({error : "Product not found"});
        }

        res.status(200).json({
            "@context" : "https://schema.org",
            "@type" : "Product",
            "@id" : `${req.protocol}://${req.get("host")}/products/${product._id}`,
            "name" : product.name,
            "category" : product.category,
            "price" : product.price
        });
    }
    catch(err){
        console.error("Error occured", err);
        res.status(500).json({error : "Internal server error"});
    }
}