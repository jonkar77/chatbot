const mongoose = require("mongoose");


const connectDB = async (mongoUrl) => {
  try {
    await mongoose.connect(mongoUrl, {
      
    });
    console.log("MongoDB connected successfully");
    return { success: true, message: "MongoDB connected successfully" };
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return { success: false, message: "MongoDB connection error: " + err.message };
  }
};
module.exports = connectDB;
