const express = require("express");
const router = express.Router();
const User = require("../model/createUser");
const { default: mongoose }=require("mongoose");

router.post("/login", async (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.status(400).send({ error: "User is required" });
  }
  try {
    const existingUser = await User.findOne({ user });

    if (existingUser) {
      return res.status(200).send({ message: "Welcome back!" });
    } else {
      const newUser = new User({ user });
      await newUser.save();
      return res.status(201).send({ message: "Welcome!" });
    }
  } catch (error) {
    return res.status(500).send({ error: `Server error: ${error.message}` });
  }
});

module.exports = router;
