const { Router } = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = Router();
const key = process.env.key;

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email: email } });

    // Check if the user exists
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email is not found!" });
    }

    // Compare the provided password with the hashed password
    const isPasswordMatch = await user.comparePassword(password);

    // Check if the passwords match
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong password!" });
    }

    const token = jwt.sign({ userId: user.id }, key, { expiresIn: "1h" });

    //send generated token as a respond
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// // User route to get user data using the token
// router.get("/user", async (req, res) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, key);
//     const userId = decoded.userId;

//     // Find the user by ID
//     const user = await User.findOne({ where: { id: userId } });

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     const { id, name, email: userEmail, role } = user;
//     // Return the user data
//     return res
//       .status(200)
//       .json({ success: true, user: { id, name, email: userEmail } });
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// });

module.exports = router;
