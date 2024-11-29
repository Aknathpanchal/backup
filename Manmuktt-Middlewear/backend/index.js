const express = require("express");
const connection = require("./src/database/db");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./src/routes/user");
const infoRoute = require("./src/routes/userInfo");
const dotenv = require("dotenv");
const chatRoute = require("./src/routes/chatHistory");
dotenv.config({ path: "./src/config/.env" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRoute);
app.use("/info", infoRoute);
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to our website" });
});

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server start at ${process.env.PORT}`);
});

module.exports = app;