const express = require("express");
const router = express.Router();
const User = require("../model/createUser");

router.get("/list_users", async (req, res) => {
  try {
    const uniqueUsers = await User.aggregate([
      {
        $group: {
          _id: "$user",
          user: { $first: "$user" },
        },
      },
    ]);

    res.status(200).json(uniqueUsers);
  } catch (error) {
    console.error("Error fetching unique users:", error);
    res.status(500).json({
      message: "Server error while fetching users",
      error: error.message,
    });
  }
});

module.exports = router;
