const mongoose = require("mongoose");

const divisionModel = new mongoose.Schema({
  name: String,
  parentId: String,
});

module.exports = mongoose.model("divisions", divisionModel);
