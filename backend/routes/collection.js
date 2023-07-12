const { Router } = require("express");
const Collection = require("../models/collectionModel");
const { v4: uuidv4 } = require("uuid");

const router = Router();

router.post("/", async (req, res) => {
  const { name, topic, description, authorName, authorRole } = req.body;
  try {
    const collection = await Collection.build({
      id: uuidv4(),
      name: name,
      topic: topic,
      description: description,
      authorName: authorName,
      authorRole: authorRole,
    });
    await collection.save();
    console.log("Collection is saved");
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ error: "Unable to create collection" });
  }
});

module.exports = router;
