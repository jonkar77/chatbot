const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async (mongoUrl) => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }
  
  try {
    const db = await mongoose.connect(mongoUrl, {
      socketTimeoutMS: 60000,   
      connectTimeoutMS: 30000,
    });
    isConnected = db.connections[0].readyState === 1;  // Ready state 1 means connected
    console.log("MongoDB connected successfully");
    return { success: true, message: "MongoDB connected successfully" };
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return { success: false, message: "MongoDB connection error: " + err.message };
  }
};

module.exports = connectDB;
