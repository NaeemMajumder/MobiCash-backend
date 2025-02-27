const UserData = require("../models/userData");
const CashReqData = require("../models/cashReqData.js");

module.exports.getCashRequest = async (req, res) => {
  let cashReqData = await CashReqData.find({ requestStatus: "pending" }).sort({
    createdAt: -1,
  });
  res.send(cashReqData);
};

module.exports.postCashRequest = async (req, res) => {
  const cashReqData = req.body;
  const result = await new CashReqData(cashReqData).save();
  res.send(result);
};

module.exports.editCashRequest = async (req, res) => {
  let { id, amount, email, status } = req.body;
  let result;
  if (status === "rejected") {
    result = await CashReqData.findByIdAndUpdate(
      id,
      { $set: { requestStatus: "rejected" } },
      { new: true }
    );
  } else {
    result = await CashReqData.findByIdAndUpdate(
      id,
      { $set: { requestStatus: "routerroved" } },
      { new: true }
    );
    await UserData.findOneAndUpdate(
      { email: email },
      {
        $inc: { currentAgentSystemAmount: amount, adminTotalAmount: amount },
      },
      { new: true }
    );
  }

  res.send(result);
};
