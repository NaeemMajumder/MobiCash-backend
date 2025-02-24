// import
const express = require('express');
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());


const port = process.env.PORT || 3000;


app.get('/', (req,res)=>{
    res.send("this is a root route");
})

app.listen(port,()=>{
    console.log(`port ${port} is running`);
})
