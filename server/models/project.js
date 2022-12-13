const mongoose = require("mongoose");

const subDivsionSchema = new mongoose.Schema({
  name: String,
});
const divisionSchema = new mongoose.Schema({
  name: String,
  code: String,
  subdivisions: [subDivsionSchema],
});

const projectSchema = new mongoose.Schema({
  name: String,
  divisions: [divisionSchema],
});

module.exports = mongoose.model("projects", projectSchema);
