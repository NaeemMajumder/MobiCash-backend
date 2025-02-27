const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const verifyTokens = require("../utils/verifyTokens.js");
const withdrawController = require("../controllers/withdraw.js");

router.get(
  "/withdraws",
  verifyTokens,
  wrapAsync(withdrawController.getWithdraws)
);

router.get(
  "/withdrawsReq",
  verifyTokens,
  wrapAsync(withdrawController.getWithdrawsRequest)
);

router.post(
  "/withdrawRequest",
  wrapAsync(withdrawController.postWithdrawsRequest)
);

router.put(
  "/withdrawsReq/:id",
  wrapAsync(withdrawController.editWithdrawRequest)
);

module.exports = router;
