const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const verifyAuth = require("../middleware/auth");
const StockModel = require("../models/stock");

router.get("/", verifyAuth, async (req, res) => {
  const data = await StockModel.find();
  const result = data.map((stock) => {
    return {
      name: stock.name,
      id: mongoose.Types.ObjectId(stock._id),
      code: stock.code,
      unit: stock.unit,
    };
  });
  res.status(201).json(result);
});

router.post("/add", verifyAuth, async (req, res) => {
  const { stock } = req.body;
  console.log(stock);
  const result = await StockModel.create(stock);
  res.status(201).json(result);
});

router.post("/update", verifyAuth, async (req, res) => {
  const stock = req.body;
  const result = await StockModel.updateOne({ _id: stock.id }, { $set: stock });
  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "updated success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

router.post("/delete", verifyAuth, async (req, res) => {
  const { id } = req.body;
  const result = await StockModel.deleteOne({ _id: id });
  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "Delete success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

module.exports = router;
