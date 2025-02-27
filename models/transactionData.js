const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    transactionType: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    userPhoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    amountTransaction: { type: Number, required: true },
    amountBeforeTransaction: { type: Number, required: true },
    role: { type: String, required: true, enum: ["User", "Admin", "Agent"] },
    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
