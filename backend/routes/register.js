const { Router } = require("express");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");

const router = Router();
const key = process.env.key;

const registerUser = async (name, email, password, role) => {
  try {
    const checkUser = await User.findOne({ where: { email: email } });

    if (checkUser) {
      return { success: false, message: "Email already exists" };
    }
    const user = User.build({
      id: uuidv4(),
      name: name,
      email: email,
      password: password,
      role: role,
    });

    await user.save();
    console.log("User was saved to the database!");
    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "Failed to create user" };
  }
};

router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await registerUser(name, email, password, role);

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.message });
    }

    const user = await User.findOne({ where: { email: email } });
    const token = jwt.sign({ userId: user.id }, key, { expiresIn: "1h" });

    return res.status(200).json({
      success: true,
      message: result.message,
      token: token,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
