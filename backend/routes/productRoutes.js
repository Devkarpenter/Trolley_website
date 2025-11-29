const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require("../controllers/productController");

const { protect, authorize } = require("../middleware/auth");

module.exports = (router) => {
  router.get("/products", getAllProducts);
  router.get("/products/categories", getCategories);
  router.get("/products/:id", getProductById);

  // ⭐ ADMIN ONLY ROUTES
  router.post("/products", protect, authorize("admin"), createProduct);
  router.put("/products/:id", protect, authorize("admin"), updateProduct);
  router.delete("/products/:id", protect, authorize("admin"), deleteProduct);
};
