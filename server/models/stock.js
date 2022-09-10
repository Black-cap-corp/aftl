const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: String,
  unit: String,
  code: Number,
});

module.exports = mongoose.model("stocks", stockSchema);
