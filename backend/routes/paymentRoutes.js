// /routes/paymentRoutes.js

const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

module.exports = (router) => {
  router.post("/payment/create-order", protect, createOrder);
  router.post("/payment/verify", protect, verifyPayment);
};
