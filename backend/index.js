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

const mongoUrl = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});
connectDB(mongoUrl);

app.use("/api", userRoutes);
app.use("/api", createResponse);
app.use("/api", messageRoutes);
app.use("/api", saveResponseRoutes);
app.use("/api", listUserRoutes);
app.use("/api", listSavedResponseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
