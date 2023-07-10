const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
require("dotenv").config();
const key = process.env.key;

router.post("/", verifyToken, async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["Authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
