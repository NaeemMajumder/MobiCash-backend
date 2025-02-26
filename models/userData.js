const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    nid: { type: Number, required: true},
    phoneCountry: { type: String, required: true},
    image: { type: String, default: "https://via.placeholder.com/150" }, 
    pin:{type: String},
    role: { type: String, required: true, enum: ["User", "Admin", "Agent"] }, 
    currentBalance: { type: Number, required: true, default: 0 }, 
    transactionType: {
      type: Schema.Types.ObjectId,
      ref: "TransactionType",
    }, // Reference to TransactionType model
    totalSendMoney: { type: Number, default: 0 }, 
    totalCashOut: { type: Number, default: 0 }, 
    accountStatus: {
      type: String,
      required: true,
      enum: ["active", "pending", "banned"],
    }, // Account status
    currentAgentSystemAmount: { type: Number, default: 0 }, 
    currentAgentRevenueAmount: { type: Number, default: 0 },
    totalAgentWithdraw: { type: Number, default: 0 }, 
    totalRevenue: { type: Number, default: 0 }, 
    totalCashInAgent: { type: Number, default: 0 }, 
    adminTotalAmount: { type: Number, default: 0 }, 
    adminTotalRevenue: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
