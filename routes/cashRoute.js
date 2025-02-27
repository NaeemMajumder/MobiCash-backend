const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const verifyTokens = require('../utils/verifyTokens.js')

const cashController = require("../controllers/cash.js");

router.get("/cashReq", verifyTokens, wrapAsync(cashController.getCashRequest));

router.post("/cashRequest", wrapAsync(cashController.postCashRequest));

router.put("/cashReq/:id", wrapAsync(cashController.editCashRequest));

module.exports = router;
