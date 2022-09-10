const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const loginRouter = require("./routes/login");
const stocksRouter = require("./routes/stocks");
const projectsRouter = require("./routes/projects");
const divisionsRouter = require("./routes/division");
const subdivisionsRouter = require("./routes/subdivision");
const firmRouter = require("./routes/firm");
const workorderRouter = require("./routes/workorder");
const userRouter = require("./routes/user");
const appUserRouter = require("./routes/appuser");
require("dotenv").config();
require("./config/database").connect();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    // get user input
    const { name, password } = req.body;

    if (!name || !password) {
      res.status(400).send("All fields are required");
    }

    // check if user exits
    const oldUser = await User.findOne({ name: name });

    if (oldUser) {
      return res.status(409).send("User Already exits");
    }

    const encryptedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: encryptedpassword,
    });

    const token = jwt.sign({ name }, process.env.TOKEN_KEY, {
      expiresIn: "24h",
    });

    user.token = token;

    res.status(201).json({
      status: "success",
      ...user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Server error occurred",
    });
  }
});

app.use("/login", loginRouter);
app.use("/stocks", stocksRouter);
app.use("/projects", projectsRouter);
app.use("/divisions", divisionsRouter);
app.use("/subdivisions", subdivisionsRouter);
app.use("/firm", firmRouter);
app.use("/workorder", workorderRouter);
app.use("/user", userRouter);
app.use("/appuser", appUserRouter);

module.exports = app;
