if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// import
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const wrapAsync = require("./utils/wrapAsync.js");

// MVC format apply
const userRoutes = require("./routes/userRoute.js");
const withdrawRoutes = require("./routes/withdrawRoute.js");
const transactionRoutes = require("./routes/transactionRoute.js");
const cashRouters = require("./routes/cashRoute.js");

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


// jwt related api
app.post(
  "/jwt",
  wrapAsync(async (req, res) => {
    let user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
    res.send({ token });
  })
);

// routes
app.use("/", userRoutes);
app.use("/", withdrawRoutes);
app.use("/", transactionRoutes);
app.use("/", cashRouters);

app.get("/", (req, res) => {
  res.send("this is a root route");
});

app.listen(port, () => {
  console.log(`port ${port} is running`);
});
