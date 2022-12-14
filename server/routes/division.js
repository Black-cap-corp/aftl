const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const verifyAuth = require("../middleware/auth");
const DivisionModel = require("../models/division");

router.post("/", verifyAuth, async (req, res) => {
  const { parentId } = req.body;
  console.log(parentId);
  const result = await DivisionModel.find({ parentId: parentId });
  console.log(result);
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
  const { division } = req.body;
  const result = await DivisionModel.create(division);
  res.status(201).json({
    name: result.name,
    parentId: result.parentId,
    id: mongoose.Types.ObjectId(result._id),
  });
});

module.exports = router;
