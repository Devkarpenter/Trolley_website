// /routes/adminRoutes.js

const { protect, authorize } = require("../middleware/auth");
const User = require("../models/User");
const express = require("express");

module.exports = (router) => {
  
  // ⭐ Get ALL users (Admin Only)
  router.get("/admin/users", protect, authorize("admin"), async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json({ success: true, users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

};
