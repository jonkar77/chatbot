const express = require("express");
const router = express.Router();
const Response = require("../model/createResponse");

router.post("/create_response", async (req, res) => {
  const {
    keyword,
    summary,
    result_text,
    result_table_path,
    result_visualization_path,
  } = req.body;
  try {
    const newResponse = {
      keyword,
      summary,
      result_text,
      result_table_path,
      result_visualization_path,
    };

    const responseEntry = new Response(newResponse);
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
