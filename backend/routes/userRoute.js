const { Router } = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = process.env.key;
const router = Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization;
  console.log("Received token:", token);
  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }
  const tokenWithoutBearer = token.split(" ")[1];
  try {
    const decoded = jwt.verify(tokenWithoutBearer, key);
    console.log("Decoded token:", decoded);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { id, name, email: userEmail, role } = user;

    // Return the user data
    return res
      .status(200)
      .json({ success: true, user: { id, name, email: userEmail, role } });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
});

module.exports = router;
