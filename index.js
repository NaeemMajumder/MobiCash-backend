if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

// import
const express = require('express');
const cors = require("cors");
const app = express();

// mongoose (2)
const mongoose = require("mongoose");
let mongo_url = "mongodb://127.0.0.1:27017/LamiaEnterprise";
main().then(()=>{
    console.log("mongodb is connected");
}).catch((error)=>{
    console.log(error);
})
async function main() {
    await mongoose.connect(mongo_url);
}


app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3000;


app.get('/', (req,res)=>{
    res.send("this is a root route");
})

app.listen(port,()=>{
    console.log(`port ${port} is running`);
})
