const { Router } = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");
const router = Router();
require("dotenv").config();
const key = process.env.key;

router.post("/", verifyToken, async (req, res) => {
  try {
    if (req.token) {
      jwt.verify(req.token, key, (err, decodedToken) => {
        if (err) {
          res.sendStatus(403);
        } else {
          res.json({
            message: "taken into dashboard successfully...",
            decodedToken,
          });
        }
      });
    } else {
      res.sendStatus(403); // No token provided, access denied
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
});

module.exports = router;
