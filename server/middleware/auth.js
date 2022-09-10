const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyAuthToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const decoded = jwt.verify(authorization, process.env.TOKEN_KEY);
    if (!decoded || Date.now() >= decoded.exp * 1000) {
      res.status(500).json({
        status: "error",
        message: "Invalid Auth Token",
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

module.exports = verifyAuthToken;
