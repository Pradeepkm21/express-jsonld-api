const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;

const connectDB = async () => {
    try{
        await mongoose.connect(URI);
        console.log('MongoDB Connected Successfully!');
    }
    catch(err){
        console.error('MongoDB Connection Error!:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
