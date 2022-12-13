const mongoose = require("mongoose");
const router = require("express").Router();
const verifyAuth = require("../middleware/auth");
const workOrderModel = require("../models/workorder");
const stockSchema = require("../models/stock");
const stock = require("../models/stock");
const counterSchema = require("../models/counter");
const projectShema = require("../models/project");

router.post("/", verifyAuth, async (req, res) => {
  const { filter } = req.body;
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
  let workorder = req.body;

  projectShema
    .findOne({
      _id: mongoose.Types.ObjectId(workorder.project.id),
    })
    .then((project) => {
      const division = project.divisions.find(
        (div) => div._id == workorder.division.id
      );

      counterSchema.findOneAndUpdate(
        { identifier: mongoose.Types.ObjectId(division._id) },
        { $inc: { seq: 1 } },
        { new: true },
        (error, doc) => {
          let seqId;
          if (doc == null) {
            counterSchema.create({
              identifier: division._id,
              seq: 1,
            });
            seqId = 1;
          } else {
            seqId = doc.seq;
          }

          workorder = {
            ...workorder,
            displayName: `AFTL/${division.code}/${seqId}`,
          };
          workOrderModel.create(workorder).then((result) => {
            console.log(result);
            const id = result._id.toString();
            console.log(id);
            res.status(201).json({ ...result, id: String(id) });
          });
        }
      );
    });
});

router.post("/update", verifyAuth, async (req, res) => {
  const workorder = req.body;
  console.log(workorder);
  const result = await workOrderModel.updateOne(
    { _id: mongoose.Types.ObjectId(workorder.id) },
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
    { displayName: { $regex: filter, $options: "i" }, status: "open" },
    { _id: 1, displayName: 1, contractors: 1, stocks: 1 }
  );
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

router.post("/getWorkorderDetails", async (req, res) => {
  const { id } = req.body;
  const result = await workOrderModel
    .findOne(
      { _id: mongoose.Types.ObjectId(id) },
      { stocks: 0, contractors: 0 }
    )
    .lean();

  res.status(200).json(result);
});

module.exports = router;
