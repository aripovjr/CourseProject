const { Router } = require("express");
const Collection = require("../models/collectionModel");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const collection = await Collection.findAll();
    res.json(collection);
  } catch (error) {
    console.log("Error fetching collections:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching collections" });
  }
});

module.exports = router;
