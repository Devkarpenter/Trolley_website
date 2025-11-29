const { protect, authorize } = require("../middleware/auth");
const Order = require("../models/Order");
const User = require("../models/User");

// 🚀 EXPORT AS A FUNCTION (VERY IMPORTANT)
module.exports = (router) => {
  
  // ===============================
  // GET ALL ORDERS (Admin only)
  // ===============================
  router.get("/admin/orders", protect, authorize("admin"), async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

      res.json({ success: true, orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });


  // ===============================
  // GET ALL USERS (Admin only)
  // ===============================
  router.get("/admin/users", protect, authorize("admin"), async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json({ success: true, users });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

};
