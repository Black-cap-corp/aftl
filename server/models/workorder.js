const mongoose = require("mongoose");

const projectShema = mongoose.Schema({
  id: String,
  name: String,
});
const firmSchema = mongoose.Schema({
  firm: String,
  contractor: String,
});

const stockSchema = new mongoose.Schema({
  stockId: String,
  stock: Number,
});

const workOrderSchema = mongoose.Schema({
  workorder: String,
  division: projectShema,
  status: String,
  subdivision: projectShema,
  project: projectShema,
  contractors: [firmSchema],
  stocks: [stockSchema],
});

module.exports = mongoose.model("workorders", workOrderSchema);
