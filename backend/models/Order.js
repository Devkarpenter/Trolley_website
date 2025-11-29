const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Guest checkout allowed
    },

    items: [
      {
        productId: { type: String },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
