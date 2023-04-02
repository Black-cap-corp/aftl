const mongoose = require("mongoose");
const verifyAuthToken = require("../middleware/auth");
const router = require("express").Router();
const firmModel = require("../models/firm");

router.get("/", verifyAuthToken, async (req, res) => {
  const result = await firmModel.find();
  const data_out = result?.map((firm) => {
    return {
      id: mongoose.Types.ObjectId(firm._id),
      firm: firm.firm,
      contractor: firm.contractor,
      code: firm.code,
    };
  });

  res.status(201).json(data_out);
});

router.post("/add", verifyAuthToken, async (req, res) => {
  const element = req.body;
  const result = await firmModel.create(element);
  res.status(201).json({
    id: mongoose.Types.ObjectId(result._id),
    firm: result.firm,
    contractor: result.contractor,
    code: result.code,
  });
});

router.post("/update", verifyAuthToken, async (req, res) => {
  const element = req.body;
  const result = await firmModel.updateOne(
    { _id: mongoose.Types.ObjectId(element.id) },
    { $set: element }
  );
  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "updated success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

router.post("/getContractor", verifyAuthToken, async (req, res) => {
  const { id } = req.body;
  const result = await firmModel.findOne({
    _id: mongoose.Types.ObjectId(id),
  });

  res.status(201).json({
    id: mongoose.Types.ObjectId(result._id),
    firm: result.firm,
    contractor: result.contractor,
    code: result.code,
  });
});

router.post("/delete", verifyAuthToken, async (req, res) => {
  const element = req.body;
  const result = await firmModel.deleteOne({
    _id: mongoose.Types.ObjectId(element.id),
  });
  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "updated success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

module.exports = router;
