const express = require("express");
const router = express.Router();
const Response = require("../model/createResponse");

router.post("/send_message", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Message text is required" });
  }
  const keywordMap = {
    error: "error",
    warning: "warning",
    success: "success",
  };

  const words = text.split(" ");

  let detectedKeyword = null;

  for (let word of words) {
    if (keywordMap[word.toLowerCase()]) {
      detectedKeyword = keywordMap[word.toLowerCase()];
      break;
    }
  }

  if (!detectedKeyword) {
    detectedKeyword = "default";
  }

  try {
    const result = await Response.findOne({ keyword: detectedKeyword });

    if (result) {
      res.status(200).json({
        message: `Keyword: ${detectedKeyword} detected`,
        data: {
          summary: result.summary,
          result_text: result.result_text,
          result_table_path: result.result_table_path,
          result_visualization_path: result.result_visualization_path,
        },
      });
    } else {
      res.status(200).json({
        message: `Keyword: ${detectedKeyword} detected, but no corresponding entry found in the database.`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
});

module.exports = router;
