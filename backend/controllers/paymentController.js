const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ===============================
// CREATE RAZORPAY ORDER
// ===============================
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user ? req.user.id : null;

    let total = 0;
    items.forEach((it) => (total += it.price * it.quantity));

    const options = {
      amount: total * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: total,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ===============================
// VERIFY PAYMENT + SAVE ORDER
// ===============================
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, items, amount } = req.body;
    const userId = req.user ? req.user.id : null;

    // Verify Razorpay signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ success: false, message: "Invalid payment!" });
    }

    // Save Order in Database
    await Order.create({
      user: userId,
      items,
      amount,
      currency: "INR",
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
      status: "paid",
    });

    res.json({ success: true, message: "Payment verified" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
