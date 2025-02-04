const express = require("express");
const bot = require("./services/botService");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000; // Используйте переменную окружения или значение по умолчанию
const sequelize = require("./config/database");

const User = require("./models/User");
const Proxy = require("./models/Proxy");

app.use(express.json());

sequelize
  .sync({ force: false })

  .then(() => {
    console.log("Tables have been created.");
  })

  .catch((err) => {
    console.error("Error creating table:", err);
  });
// Import routes

const v2boxRoutes = require("./routes/v2boxRoutes");
const spaceproxyRoutes = require("./routes/spaceproxyRoutes");

// Use routes

app.use("/api/v2box", v2boxRoutes);
app.use("/api/spaceproxy", spaceproxyRoutes);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

bot;
