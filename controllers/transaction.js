const { v4: uuidv4 } = require("uuid");
const TransactionData = require("../models/transactionData.js");

module.exports.getAllTransaction = async (req, res) => {
  let allTransactions;
  if (req.query.email) {
    allTransactions = await TransactionData.find({
      email: req.query.email,
    }).sort({ createdAt: -1 });
  } else {
    allTransactions = await TransactionData.find().sort({ createdAt: -1 });
  }

  res.send(allTransactions);
};

module.exports.postCashIn = async (req, res) => {
  const transactionData = req.body;

  transactionData.transactionId = "TXN-" + uuidv4().slice(0, 8);
  transactionData.transactionType = "Cash In";
  const result = await new TransactionData(transactionData).save();

  await UserData.findOneAndUpdate(
    { email: transactionData?.email },
    {
      $inc: {
        currentBalance: -transactionData?.amountTransaction,
        totalCashInAgent: transactionData?.amountTransaction,
        currentAgentSystemAmount: transactionData?.amountTransaction,
      },
      $push: { transactions: result._id },
    },
    { new: true }
  );

  await UserData.findOneAndUpdate(
    { phone: transactionData.phoneNumber },
    { $inc: { currentBalance: transactionData?.amountTransaction } },
    { new: true }
  );

  res.send(result);
};

module.exports.postSendMoney = async (req, res) => {
  const transactionData = req.body;

  transactionData.transactionId = "TXN-" + uuidv4().slice(0, 8);
  transactionData.transactionType = "Send Money";
  const result = await new TransactionData(transactionData).save();

  if (transactionData.amountTransaction > 100) {
    await UserData.findOneAndUpdate(
      { role: "Admin" },
      { $inc: { adminTotalRevenue: 5 } },
      { new: true }
    );
  }

  await UserData.findOneAndUpdate(
    { email: transactionData?.email },
    {
      $inc: {
        currentBalance: -transactionData?.amountTransaction,
        totalSendMoney: transactionData?.amountTransaction,
      },
      $push: { transactions: result._id },
    },
    { new: true }
  );
  res.send(result);
};

module.exports.postCashOut = async (req, res) => {
  const transactionData = req.body;

  transactionData.transactionId = "TXN-" + uuidv4().slice(0, 8);
  transactionData.transactionType = "Cash Out";
  const result = await new TransactionData(transactionData).save();

  const adminRevenue = transactionData.amountTransaction * (0.5 / 100);
  const agentRevenue = transactionData.amountTransaction * (1 / 100);

  await UserData.findOneAndUpdate(
    { role: "Admin" },
    { $inc: { adminTotalRevenue: adminRevenue } },
    { new: true }
  );

  await UserData.findOneAndUpdate(
    { phone: transactionData.phoneNumber },
    {
      $inc: {
        currentAgentRevenueAmount: agentRevenue,
        totalRevenue: agentRevenue,
      },
    },
    { new: true }
  );

  await UserData.findOneAndUpdate(
    { email: transactionData?.email },
    {
      $inc: {
        currentBalance: -transactionData?.amountTransaction,
        totalCashOut: transactionData?.amountTransaction,
      },
      $push: { transactions: result._id },
    },
    { new: true }
  );

  res.send(result);
};
