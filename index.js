if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// import
const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();


// import utils functions
const {pinHide, findPin} = require('./utils/bycryptFunction')


// import Schema
const UserData = require('./models/userData.js');

// mongoose (2)
const mongoose = require("mongoose");
let mongo_url = process.env.MONGO_URL;
main()
  .then(() => {
    console.log("mongodb is connected to mongoose");
  })
  .catch((error) => {
    console.log(error);
  });
async function main() {
  await mongoose.connect(mongo_url);
}

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;




// general API's route

app.get("/users", async (req, res) => {
    let result; 
    if(req.query.email){
        result = await UserData.findOne({ email: req.query.email });
    }else{
        result = await UserData.find();
    }
    res.send(result);
});
app.post("/users", async (req, res) => {
    const { name, email, pin, role, nid, phone, phoneCountry, image } = req.body;
  
    if (!name || !email || !pin || !role || !nid || !phone || !phoneCountry) {
      return res.status(400).send({ error: "Missing required fields" });
    }
    const hashPin = await pinHide(pin);
  
    let newUser = {
      name,
      email,
      phone,
      phoneCountry,
      pin: hashPin,
      image,
      role,
      nid,
      accountStatus: role === "User" ? "active" : "pending",
      currentBalance: role === "User" ? 40 : 100000,
    };
  
    const addNewUser = new UserData(newUser);
    const result = await addNewUser.save();
  
    res.status(201).send({ message: "User created successfully", result });
});
  



// ===================
app.get("/demo", async (req, res) => {
  const saltRounds = 10;
  const pin = "1234"; // Example PIN

  bcrypt.hash(pin, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log("Hashed PIN:", hash);
    return res.send({password: hash});
 
  });

});

app.get("/result", async (req, res) => {
    const storedHash = "$2b$10$cJnHyVw0P65.qiSVL3k8Ae2J4VAuLt/zYuaELQcDTQoUUTEHVqyyi"; // Example stored hash
    const enteredPin = "1234"; // PIN entered by the user
    
    bcrypt.compare(enteredPin, storedHash, (err, result) => {
        if (err) throw err;
        if (result) {
            console.log("The PIN is correct.");
        } else {
            console.log("The PIN is incorrect.");
        }
        res.send({result: result})
    });
  
  });
// ==========================



// admin apis route




// agent apis route




// user apis route
app.post('/pinVerify', async(req,res)=>{
  let email = req.query.email;
  let pin = req.body.pin;

  let user = await UserData.findOne({email:email})
  let hashPin = user.pin;

  const result = await findPin(hashPin,pin);
  console.log(result);

  res.send(result);
})







app.get("/", (req, res) => {
  res.send("this is a root route");
});

app.listen(port, () => {
  console.log(`port ${port} is running`);
});
