const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authenticateToken = require("../middleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    message: `Welcome, ${req.user.email}!`
  });
});

module.exports = router;
