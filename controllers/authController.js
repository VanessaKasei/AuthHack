const { readUsers, writeUsers } = require("../db/fileDb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Read DB
    let users = readUsers();

    // Check if exists
    if (users.find((u) => u.email === email)) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // New user object
    const newUser = {
      id: Date.now().toString(), // Unique ID
      email,
      password: hashed,
    };

    // Save user
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.id,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let users = readUsers();

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
