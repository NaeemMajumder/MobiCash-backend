const { v4: uuidv4 } = require("uuid");
const WithDrawData = require("../models/withdrawData.js");

module.exports.getWithdraws = async (req, res) => {
  let result;
  if (req.query.email) {
    result = await WithDrawData.find({ email: req.query.email });
  } else {
    result = await WithDrawData.find().sort({ createdAt: -1 });
  }
  res.send(result);
};

module.exports.getWithdrawsRequest = async (req, res) => {
  let withdrawsRequest = await WithDrawData.find({
    withdrawStatus: "pending",
  }).sort({ createdAt: -1 });
  res.send(withdrawsRequest);
};

module.exports.postWithdrawsRequest = async (req, res) => {
  const withdrawData = req.body;
  withdrawData.withdrawId = "WID-" + uuidv4().slice(0, 8);
  const result = await new WithDrawData(withdrawData).save();
  res.send(result);
};

module.exports.editWithdrawRequest = async (req, res) => {
  let { id, withdrawStatus, withdrawBalance, email } = req.body;
  let result;
  if (withdrawStatus === "approved") {
    result = await WithDrawData.findByIdAndUpdate(
      id,
      { $set: { withdrawStatus: "approved" } },
      { new: true }
    );
    await UserData.findOneAndUpdate(
      { email: email },
      {
        $inc: {
          currentAgentRevenueAmount: -withdrawBalance,
          totalAgentWithdraw: withdrawBalance,
        },
      },
      { new: true }
    );
  } else {
    result = await WithDrawData.findByIdAndUpdate(
      id,
      { $set: { withdrawStatus: "rejected" } },
      { new: true }
    );
  }
  res.send(result);
};
