const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const verifyAuth = require("../middleware/auth");
const SubdivisionModel = require("../models/subdivision");

router.post("/", verifyAuth, async (req, res) => {
  const { parentId } = req.body;
  const result = await SubdivisionModel.find({ parentId: parentId });
  const data = result?.map((div) => {
    return {
      id: mongoose.Types.ObjectId(div._id),
      name: div.name,
      parentId: div.parentId,
    };
  });
  res.status(201).json(data);
});

router.post("/add", verifyAuth, async (req, res) => {
  const { subdivision } = req.body;
  const result = await SubdivisionModel.create(subdivision);
  res.status(201).json({
    name: result.name,
    parentId: result.parentId,
    id: mongoose.Types.ObjectId(result._id),
  });
});

module.exports = router;
