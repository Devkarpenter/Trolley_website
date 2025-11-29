const { createOrder, verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/auth");

module.exports = (router) => {
  // Protect both payment routes
  router.post("/payment/create-order", protect, createOrder);
  router.post("/payment/verify", protect, verifyPayment);
};
