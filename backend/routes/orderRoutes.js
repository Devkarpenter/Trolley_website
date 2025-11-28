// /routes/orderRoutes.js
const { createOrder, verifyPayment } = require('../controllers/orderController');
const { protect } = require('../middleware/auth'); // optional protect if you want only logged-in users

module.exports = (router) => {
  // create order (frontend calls this to get razorpay order id)
  router.post('/orders/create', /* protect, */ createOrder);

  // verify payment (frontend posts razorpay response here)
  router.post('/orders/verify', /* protect, */ verifyPayment);
};
