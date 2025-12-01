const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Auth API is running...");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

module.exports = app;
