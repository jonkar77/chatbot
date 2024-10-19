const mongoose = require("mongoose");

const connectDB = async (mongoUrl) => {
  try {
    await mongoose.connect(mongoUrl, {
      socketTimeoutMS: 45000,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    });
    return { success: true, message: "MongoDB connected successfully" };
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return { success: false, message: "MongoDB connection error: " + err.message };
  }
};

module.exports = connectDB;
