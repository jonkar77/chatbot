const { baseURL } = require("./constants/envConfig");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/createUser");
const createResponse = require("./routes/createResponse");
const messageRoutes = require("./routes/sendMessage");
const saveResponseRoutes = require("./routes/saveResponse");
const listUserRoutes = require("./routes/listUser");
const listSavedResponseRoutes = require("./routes/getResponse");

const app = express();
const PORT = 5000;

dotenv.config();

console.log(`${baseURL}`);
const mongoUrl = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(
  cors({
    origin: `${baseURL}`,
    methods: ["GET", "POST"],
    credentials: true,
    maxAge: 86400,
  })
);

(async () => {
  const connectionStatus = await connectDB(mongoUrl);
  if (connectionStatus.success) {
    console.log("Successfully connected to MongoDB");
  } else {
    console.log("Failed to connect to MongoDB:", connectionStatus.message);
  }
})();



app.use("/api", userRoutes);
app.use("/api", createResponse);
app.use("/api", messageRoutes);
app.use("/api", saveResponseRoutes);
app.use("/api", listUserRoutes);
app.use("/api", listSavedResponseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
