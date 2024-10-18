const mongoose = require("mongoose");

const connectDB = async (mongoUrl) => {
  try {
    await mongoose.connect(mongoUrl, {
      socketTimeoutMS: 45000,  // Increase socket timeout to 45 seconds
      keepAlive: true,
      keepAliveInitialDelay: 300000,  // Set keep-alive to 5 minutes
    });
    
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
