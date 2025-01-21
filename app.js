const express = require("express");
const bot = require("./services/botService");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000; // Используйте переменную окружения или значение по умолчанию
const sequelize = require("./config/database");

const User = require("./models/User");
const Proxy = require("./models/Proxy");

app.use(express.json());

// Тестирование подключения к базе данных

sequelize
  .authenticate()

  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })

  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
// Sync the User model with the database

sequelize
  .sync()

  .then(() => {
    console.log("Tables have been created.");
  })

  .catch((err) => {
    console.error("Error creating table:", err);
  });
// Import routes

const wireguardRoutes = require("./routes/wireguardRoutes");
const spaceproxyRoutes = require("./routes/spaceproxyRoutes");

// Use routes

app.use("/api/wireguard", wireguardRoutes);
app.use("/api/spaceproxy", spaceproxyRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

bot;
