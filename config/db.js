const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectToDB(){
    try{
        await client.connect();
        db = client.db();
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("DB connection failed: ", error);
    }
}

function getDB() {
  if (!db) {
    throw new Error("DB not initialized. Call connectToDB() first.");
  }
  return db;
}

module.exports = { connectToDB, getDB };
