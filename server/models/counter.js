const mongoose = require("mongoose");

const counterSchema = mongoose.Schema({
  identifier: String,
  seq: Number,
});

module.exports = mongoose.model("counters", counterSchema);
