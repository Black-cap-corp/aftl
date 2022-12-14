const mongoose = require("mongoose");

const mobileuserSchema = new mongoose.Schema({
  name: String,
  password: String,
  mobile: Number,
});

module.exports = mongoose.model("appusers", mobileuserSchema);
