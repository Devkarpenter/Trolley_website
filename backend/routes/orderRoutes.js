const { getAllOrders } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

module.exports = (router) => {
  // ⭐ Admin can view all orders
  router.get("/admin/orders", protect, authorize("admin"), getAllOrders);
};
