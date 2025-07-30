const express = require("express")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 4000

//Middleware for parsing json data
app.use(express.json())

//routes
app.get("/", (req, res)=>{
    res.send("Hello, I'm speaking from server");
})

app.post("/customers", (req, res)=>{
    const data = req.body;
    res.send({
        "name" : data.name,
        "email" : data.email
    })
})

//Server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})