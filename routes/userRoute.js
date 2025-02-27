const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const verifyTokens = require("../utils/verifyTokens.js");

const userController = require("../controllers/user.js");

router.get("/users", verifyTokens, wrapAsync(userController.getUser));

router.get("/newUsers", verifyTokens, wrapAsync(userController.getNewUser));

router.post("/users", wrapAsync(userController.postUser));

router.get("/user/:id", wrapAsync(userController.getUserById));

router.put("/user/:id", wrapAsync(userController.editUser));

router.post("/pinVerify", wrapAsync(userController.pinVerify));

module.exports = router;
