const express = require("express");
const router = express.Router();
const SaveResponse = require("../model/saveResponse");

router.post("/save_response", async (req, res) => {
  const {
    user,
    summary,
    result_text,
    result_table_path,
    result_visualization_path,
  } = req.body;
  
  try {
    const newResponse = {
      user,
      summary,
      result_text,
      result_table_path,
      result_visualization_path,
    };

    const responseEntry = new SaveResponse(newResponse);
    await responseEntry.save();

    res.status(201).json(responseEntry);
  } catch (error) {
    res.status(500).json({
      summary: "null",
      result_text: "null",
      result_table_path: "null",
      result_visualization_path: "null",
      error: `message: Server Error: ${error.message}`,
    });
  }
});

module.exports = router;
