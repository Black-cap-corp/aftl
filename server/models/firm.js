const mongoose = require("mongoose");

const firmSchema = mongoose.Schema({
  firm: String,
  contractor: String,
});

module.exports = mongoose.model("firms", firmSchema);
