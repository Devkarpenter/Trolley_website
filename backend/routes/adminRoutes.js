const { protect, authorize } = require("../middleware/auth");
const User = require("../models/User");
const Product = require("../models/Product");

module.exports = (router) => {
  // ⭐ GET ALL USERS
  router.get("/admin/users", protect, authorize("admin"), async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json({ success: true, users });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // ⭐ GET ALL PRODUCTS
  router.get("/admin/products", protect, authorize("admin"), async (req, res) => {
    try {
      const products = await Product.find();
      res.json({ success: true, products });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });
};
