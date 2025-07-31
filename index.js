const express = require("express")
require("dotenv").config()

const {connectToDB} = require("./config/db");
const customerRoute = require("./routes/customerRoutes");
const productRoute = require("./routes/productRoutes");
const orderRoute = require("./routes/orderRoutes");

const app = express()
const PORT = process.env.PORT || 4000

//Middleware for parsing json data
app.use(express.json())

//connect to DB server
connectToDB();

//Routes
app.use("/", customerRoute);
app.use("/", productRoute);
app.use("/", orderRoute);


app.get("/", (req, res)=>{
    res.send("Hello, I'm speaking from server");
});


//Server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})