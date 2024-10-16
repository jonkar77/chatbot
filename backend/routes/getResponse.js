const express = require("express");
const router = express.Router();
const Response = require("../model/saveResponse");

router.get('/get_saved_response', async (req, res) => {
    const { user } = req.query;  
  
    try {
        const responses = await Response.find({ user });
      
      if (responses.length === 0) {
        return res.status(404).json({ message: `No responses found for user ${user}` });
      }
  
      res.json(responses); 
    } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
    }
  });
  

  module.exports = router;