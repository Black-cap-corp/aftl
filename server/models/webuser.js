const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  name: String,
  password: String,
  type: { type: String, default: "operator" },
  entitlement: { type: String, default: "read" },
});

module.exports = mongoose.model("users", UserModel);
