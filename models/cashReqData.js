const mongoose = require("mongoose");
const { Schema } = mongoose;

const cashRequestSchema = new Schema(
  {
    name: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg",
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    currentBalance: { type: Number, required: true },
    cashRequestedAmount: { type: Number, required: true },
    requestStatus: { 
      type: String, 
      default: "pending", 
      enum: ["pending", "approved", "rejected"] 
    },
  },
  { timestamps: true }
);

const CashRequest = mongoose.model("CashRequest", cashRequestSchema);

module.exports = CashRequest;
