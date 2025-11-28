// /models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,   // optional for guest checkout
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
  currency: { type: String, default: 'INR' },

  // ⭐ MATCHING FIELD NAMES FOR RAZORPAY VERIFICATION
  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String, default: null },
  razorpay_signature: { type: String, default: null },

  status: {
    type: String,
    enum: ['created', 'paid', 'failed', 'refunded'],
    default: 'created',
  },

  shippingAddress: {
    name: String,
    phone: String,
    line1: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
