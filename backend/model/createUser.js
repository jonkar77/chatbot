const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: String,
});

module.exports = mongoose.model("User", userSchema);
