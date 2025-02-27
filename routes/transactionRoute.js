const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const transactionController = require("../controllers/transaction.js");
const verifyTokens = require("../utils/verifyTokens.js");

router.get(
  "/allTransactions",
  verifyTokens,
  wrapAsync(transactionController.getAllTransaction)
);

router.post("/cashIn", wrapAsync(transactionController.postCashIn));

router.post("/sendMoney", wrapAsync(transactionController.postSendMoney));

router.post("/cashOut", wrapAsync(transactionController.postCashOut));

module.exports = router;
