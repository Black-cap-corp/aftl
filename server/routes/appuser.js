const mongoose = require("mongoose");
const router = require("express").Router();
const verifyAuth = require("../middleware/auth");
const AppUser = require("../models/mobileuser");

router.get("/", async (req, res) => {
  const result = await AppUser.find();
  const result_data = result.map((user) => {
    return {
      id: mongoose.Types.ObjectId(user._id),
      name: user._doc.name,
      mobile: user._doc.mobile,
    };
  });
  res.status(201).json(result_data);
});

router.post("/add", verifyAuth, async (req, res) => {
  const user = req.body;
  const result = await AppUser.create(user);
  res
    .status(201)
    .json({ ...result._doc, id: mongoose.Types.ObjectId(result._id) });
});

router.post("/update", verifyAuth, async (req, res) => {
  const user = req.body;
  const result = await AppUser.replaceOne(
    { _id: mongoose.Types.ObjectId(user._id) },
    {
      name: user.name,
      password: user.password,
      mobile: user.mobile,
    }
  );
  console.log(user, result);
  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "updated success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});

router.post("/delete", verifyAuth, async (req, res) => {
  const { id } = req.body;
  const result = await AppUser.deleteOne({ _id: id });
  if (result.acknowledged) {
    res.status(201).json({ status: "success", message: "Delete success" });
  } else {
    res.status(400).json({ status: "error", message: "error updating" });
  }
});
router.post("/verifyUser", async (req, res) => {
  const loginCred = req.body;
  const result = await AppUser.findOne({ mobile: loginCred.mobile });
  if (result === null) {
    res.status(400).send({ status: "error", message: "User not found" });
  } else {
    if (result.password !== loginCred.password) {
      res.status(400).send("Password doesn't match");
    } else {
      res.status(200).json({ user: result, status: "success" });
    }
  }
});

module.exports = router;
