const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id;

    let total = 0;

    items.forEach((it) => {
      total += it.price * it.quantity;
    });

    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: total,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, items, amount } = req.body;
    const userId = req.user.id;

    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ success: false, message: "Invalid payment!" });
    }

    await Order.create({
      user: userId,
      items,
      amount,
      paymentStatus: "Paid",
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    });

    res.json({ success: true, message: "Payment successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
