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