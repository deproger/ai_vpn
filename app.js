const express = require("express");
const bot = require("./services/botService");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000; // Используйте переменную окружения или значение по умолчанию
const sequelize = require("./config/database");

const User = require("./models/User");

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

// Import routes

const appRoutes = require("./routes/webappRoutes");

// Use routes

app.use("/api/app", appRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

bot;
