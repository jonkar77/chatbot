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
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

dotenv.config();

const mongoUrl = 'mongodb+srv://onkarjoshi296:Joshi%40707@chatbot.zi6ox.mongodb.net/?retryWrites=true&w=majority&appName=chatbot';

app.use(bodyParser.json());
app.use(
  cors({
    origin: "",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", async (req, res) => {
  try {
    await mongoose.connect(mongoUrl);
    res.send("<html><body><h3>Server is up and running!</h3><p>" + " MONGO CONNECTED " + "</p></body></html>");
  } catch (error) {
    res.send("<html><body><h3>Server failed to connect!</h3><p>" + " FAILED TO CONNECT " +"</p></body></html>");
  }
});


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
