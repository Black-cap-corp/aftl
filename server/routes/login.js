const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // fetch details of user
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ name }, process.env.TOKEN_KEY, {
        expiresIn: "24h",
      });

      res.status(201).json({
        user: name,
        auth: token,
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "error",
        message: "Invalid Credentials",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: "Error occured while logging in",
    });
  }
});

router.post("/verifyAuth", (req, res) => {
  // get token
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (!decoded || Date.now() >= decoded.exp * 1000) {
      res.status(500).json({
        status: "error",
        message: "Invalid Auth Token",
      });
    } else {
      const { name } = decoded;
      res.status(201).json({
        status: "success",
        name,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});

module.exports = router;
