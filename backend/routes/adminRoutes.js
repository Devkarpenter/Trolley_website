const { protect, authorize } = require("../middleware/auth");
const Order = require("../models/Order");

module.exports = (router) => {
  // ADMIN: Fetch all orders with user name + email
  router.get(
    "/admin/orders",
    protect,
    authorize("admin"),
    async (req, res) => {
      try {
        const orders = await Order.find()
          .populate("user", "name email")  // ⭐ this gives user details
          .sort({ createdAt: -1 });

        res.json({ success: true, orders });
      } catch (err) {
        res.status(500).json({ success: false, message: err.message });
      }
    }
  );
};
