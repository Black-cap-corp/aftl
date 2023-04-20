const mongoose = require("mongoose");
const router = require("express").Router();
const verifyAuth = require("../middleware/auth");
const UserModel = require("../models/webuser");
const MobileuserModel = require("../models/mobileuser");

router.get("/", verifyAuth, async (req, res) => {
  const result = await UserModel.find();
  const result_data = result.map((user) => {
    return { ...user._doc, id: mongoose.Types.ObjectId(user._id) };
  });
  res.status(201).json(result_data);
});

router.post("/add", verifyAuth, async (req, res) => {
  const user = req.body;
  const result = await UserModel.create(user);
  res.status(201).json({ ...result, id: mongoose.Types.ObjectId(result._id) });
});

router.post("/update", verifyAuth, async (req, res) => {
  const user = req.body;
  const result = await UserModel.updateOne({ _id: user._id }, { $set: user });

  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "updated success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

router.post("/delete", verifyAuth, async (req, res) => {
  const { id } = req.body;
  const result = await UserModel.deleteOne({ _id: id });
  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "Delete success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

router.post("/getIdentities", async (req, res) => {
  const { ids } = req.body;

  const webUsers = await UserModel.find(
    { _id: { $in: ids?.app } },
    { _id: 1, name: 1 }
  ).lean();
  const appUsers = await MobileuserModel.find({
    _id: { $in: ids?.mobile },
  }).lean();

  res.status(200).json([...webUsers, ...appUsers]);
});

module.exports = router;
