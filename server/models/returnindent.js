const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  stockId: String,
  returnQuantity: Number,
  acceptedQuantity: Number,
});

const historySchema = mongoose.Schema({
  who: String,
  when: Number,
  description: String,
  statusCode: Number,
});

const returnIndentSchema = mongoose.Schema({
  indentId: String,
  vehicle: String,
  indentNo: String,
  indentType: Number,
  requestor: String,
  NeededFor: Number,
  status: String,
  approved: Boolean,
  statusCode: Number,
  workorder: String,
  returnStocks: [stockSchema],
  history: [historySchema],
});

module.exports = mongoose.model("returnIndents", returnIndentSchema);
