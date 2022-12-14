const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  name: String,
  password: String,
  entitlement: [String],
});

module.exports = mongoose.model("users", UserModel);
