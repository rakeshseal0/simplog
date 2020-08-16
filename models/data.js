const mongoose = require("mongoose");

var dataSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  log: String,
  time: {
    type: String,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("data", dataSchema);
