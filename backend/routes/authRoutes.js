const {
  signup,
  signin,
  logout,
  getProfile,
  updateProfile,
  googleLogin,
} = require("../controllers/authController");

const { protect } = require("../middleware/auth");

module.exports = (router) => {
  router.post("/auth/signup", signup);
  router.post("/auth/signin", signin);
  router.post("/auth/logout", logout);

  // Google Login Route
  router.post("/auth/google", googleLogin);

  router.get("/auth/profile", protect, getProfile);
  router.put("/auth/profile", protect, updateProfile);
};
