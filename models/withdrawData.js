const mongoose = require("mongoose");
const { Schema } = mongoose;

const withdrawSchema = new Schema(
  {
    withdrawId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg",
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    currentRevenueBalance: { type: Number, required: true },
    withdrawBalance: { type: Number, required: true },
    withdrawStatus: { 
      type: String, 
      default: "pending", 
      enum: ["pending", "approved", "rejected"] 
    },
  },
  { timestamps: true }
);

const Withdraw = mongoose.model("Withdraw", withdrawSchema);

module.exports = Withdraw;
