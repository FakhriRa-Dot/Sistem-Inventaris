const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");
const { route } = require("./activityRoutes");

router.post("/login", login);
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user" });
  }
});

module.exports = router;
