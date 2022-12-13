const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  stockId: String,
  requestedQuantity: Number,
  approvedQuantity: Number,
});

const historySchema = mongoose.Schema({
  who: String,
  when: Number,
  description: String,
  statusCode: Number,
});

const indentSchema = mongoose.Schema({
  indentNo: String,
  workorder: String,
  location: String,
  vehicle: String,
  indentType: String,
  contractor: String,
  requestor: String,
  neededFor: Number,
  status: String,
  approved: Boolean,
  statusCode: Number,
  requestedStocks: [stockSchema],
  history: [historySchema],
  approvers: { type: [String], default: [] },
});

module.exports = mongoose.model("indents", indentSchema);
