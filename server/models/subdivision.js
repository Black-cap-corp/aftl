const mongoose = require("mongoose");

const subdivisionModel = new mongoose.Schema({
  name: String,
  parentId: String,
});

module.exports = mongoose.model("subdivisions", subdivisionModel);
