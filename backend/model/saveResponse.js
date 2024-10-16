const mongoose = require("mongoose");

const saveResponseSchema = new mongoose.Schema({
  user: String,
  summary: String,
  result_text: String,
  result_table_path: String,
  result_visualization_path: String,
});

module.exports = mongoose.model("SaveResponse", saveResponseSchema);
