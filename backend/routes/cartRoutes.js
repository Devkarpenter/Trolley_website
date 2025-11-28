// backend/routes/cartRoutes.js
const Cart = require("../models/Cart");
const { protect } = require("../middleware/auth");

module.exports = (router) => {
  // Save Cart
  router.post("/cart/save", protect, async (req, res) => {
    try {
      const { items } = req.body;

      let cart = await Cart.findOne({ user: req.user.id });

      if (cart) {
        cart.items = items; // update existing cart
        await cart.save();
      } else {
        cart = await Cart.create({
          user: req.user.id,
          items,
        });
      }

      res.json({ success: true, cart });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Get Saved Cart
  router.get("/cart/get", protect, async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id });
      res.json({
        success: true,
        cart: cart ? cart.items : [],
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};
