const mongoose = require("mongoose");

const firmSchema = mongoose.Schema({
  firm: String,
  contractor: String,
  code: String,
});

module.exports = mongoose.model("firms", firmSchema);
