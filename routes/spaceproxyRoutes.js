const express = require("express");
const router = express.Router();
const { buyProxy, renewProxy } = require("../controllers/spaceproxyController"); // Импортируем renewProxy
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Маршрут для покупки прокси
router.post("/buyProxy", async (req, res) => {
  // Извлечение токена из заголовков
  const token = req.headers["authorization"]?.split(" ")[1];

  // Проверка наличия токена
  if (!token) {
    return res.status(401).json({ error: "Токен не предоставлен" });
  }

  console.log(token);

  // Проверка токена
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Недействительный токен" });
    }

    // Извлечение параметров из тела запроса
    const { country, period, quantity } = req.body;

    // Проверка наличия необходимых параметров
    if (!country || !period) {
      console.log("Недостаточно данных для запроса");
      return res.status(400).json({ error: "Недостаточно данных для запроса" });
    }

    try {
      // Если токен действителен, вызываем функцию buyProxy
      const result = await buyProxy(decoded.chatId, country, period, quantity);
      res.json(result); // Возвращаем результат
    } catch (error) {
      console.error("Ошибка при покупке прокси:", error);
      res.status(500).json({ error: "Ошибка при покупке прокси" });
    }
  });
});

// Маршрут для продления прокси
router.post("/renewProxy", async (req, res) => {
  // Извлечение токена из заголовков

  const token = req.headers["authorization"]?.split(" ")[1];

  // Проверка наличия токена

  if (!token) {
    return res.status(401).json({ error: "Токен не предоставлен" });
  }

  console.log("Token:", token);

  // Проверка токена

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Недействительный токен" });
    }

    // Извлечение параметров из тела запроса

    const { proxies, period } = req.body;

    // Проверка наличия необходимых параметров

    if (!proxies || !period) {
      console.log("Недостаточно данных для запроса");

      return res.status(400).json({ error: "Недостаточно данных для запроса" });
    }

    try {
      // Если токен действителен, вызываем функцию renewProxy

      const result = await renewProxy(proxies, period);

      res.json(result); // Возвращаем результат
    } catch (error) {
      console.error("Ошибка при продлении прокси:", error);

      res.status(500).json({ error: "Ошибка при продлении прокси" });
    }
  });
});

module.exports = router;
