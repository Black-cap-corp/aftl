const mongoose = require("mongoose");
const router = require("express").Router();
const verifyAuth = require("../middleware/auth");
const workOrderModel = require("../models/workorder");
const stockSchema = require("../models/stock");
const stock = require("../models/stock");

router.post("/", verifyAuth, async (req, res) => {
  const { filter } = req.body;
  console.log(filter);
  const result = await workOrderModel.find({
    "division.id": filter.division,
    "project.id": filter.project,
    "subdivision.id": filter.subdivision,
  });
  const result_data = result.map((work) => {
    return { ...work._doc, id: mongoose.Types.ObjectId(work._id) };
  });
  res.status(201).json(result_data);
});

router.post("/add", verifyAuth, async (req, res) => {
  const workorder = req.body;
  const result = await workOrderModel.create(workorder);
  res.status(201).json({ ...result, id: mongoose.Types.ObjectId(result._id) });
});

router.post("/update", verifyAuth, async (req, res) => {
  const workorder = req.body;
  const result = await workOrderModel.updateOne(
    { _id: workorder.id },
    { $set: workorder }
  );

  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "updated success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

router.post("/delete", verifyAuth, async (req, res) => {
  const { id } = req.body;
  const result = await workOrderModel.deleteOne({ _id: id });
  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "Delete success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

router.post("/getWorkorderByQuery", async (req, res) => {
  const { filter } = req.body;
  const result = await workOrderModel.find(
    { workorder: { $regex: filter }, status: "open" },
    { _id: 1, workorder: 1, contractors: 1 }
  );
  console.log(result);
  res.status(200).json(result);
});

router.post("/getStocksForOrder", async (req, res) => {
  const { workorderId } = req.body;
  const workorder = await workOrderModel.findOne(
    { _id: workorderId },
    { stocks: 1 }
  );

  const stocksArray = workorder?.stocks?.map((stock) => stock.stockId);

  const stocksResult = await stockSchema.find({ _id: { $in: stocksArray } });
  const result = stocksResult.map((stock) => {
    const stockQuantity = workorder.stocks.find(
      (wStock) => wStock.stockId == stock._id
    ).stock;
    return { ...stock._doc, stock: stockQuantity };
  });

  res.status(200).json(result);
});

module.exports = router;
