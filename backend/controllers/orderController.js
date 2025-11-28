// /controllers/orderController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

// initialize razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order (called by frontend before opening checkout)
exports.createOrder = async (req, res) => {
  try {
    const { items = [], currency = 'INR', shippingAddress = {}, userId } = req.body;

    // Calculate total amount in rupees (frontend should pass in paise or rupees; here we calculate)
    // Expect frontend to send amounts in rupees; convert to paise for Razorpay.
    const subtotal = items.reduce((s, it) => s + (Number(it.price) * Number(it.quantity || 1)), 0);
    const amountInPaise = Math.round(subtotal * 100); // paise

    const options = {
      amount: amountInPaise,
      currency,
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1, // automatic capture
    };

    const rOrder = await razorpay.orders.create(options);

    // Save order in DB
    const orderDoc = await Order.create({
      user: userId || null,
      items,
      amount: amountInPaise,
      currency,
      razorpayOrderId: rOrder.id,
      shippingAddress,
    });

    return res.status(201).json({
      success: true,
      order: orderDoc,
      razorpayOrder: {
        id: rOrder.id,
        amount: rOrder.amount,
        currency: rOrder.currency,
      },
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('createOrder error', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Verify payment after frontend returns payment response
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Signature verification
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      // mark order as failed
      await Order.findOneAndUpdate({ razorpayOrderId: razorpay_order_id }, { status: 'failed' });
      return res.status(400).json({ success: false, message: 'Invalid signature - payment verification failed' });
    }

    // Mark order paid
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: 'paid' },
      { new: true }
    );

    return res.status(200).json({ success: true, order });
  } catch (err) {
    console.error('verifyPayment error', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
