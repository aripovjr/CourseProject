const { Router } = require("express");
const User = require("../models/userModel");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error deleting user: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user " });
  }
});

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    console.log("Error updating user's role:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user's role" });
  }
});

router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    console.log("Error updating user's role:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user's role" });
  }
});

module.exports = router;
