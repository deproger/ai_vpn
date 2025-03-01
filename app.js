const express = require("express");
const bot = require("./services/botService");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000; // Используйте переменную окружения или значение по умолчанию
const sequelize = require("./config/database");
const Config = require("./models/Config");
const User = require("./models/User");
const vpnRoutes = require("./routes/vpnRoutes");
var path = require('path');

app.use(express.static(path.resolve('./public')));

app.use(express.json());

sequelize
  .sync({ force: false })

  .then(() => {
    console.log("Tables have been created.");
  })

  .catch((err) => {
    console.error("Error creating table:", err);
  });

app.use("/api/vpn", vpnRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

bot;
