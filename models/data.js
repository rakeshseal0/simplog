const mongoose = require("mongoose");
var timestamps = require("mongoose-timestamp");

var dataSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  log: String,

  incomingIP: {
    type: String,
    required: true,
  },
});

dataSchema.plugin(timestamps);

module.exports = mongoose.model("data", dataSchema);
