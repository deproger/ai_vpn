const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/User");
require("dotenv").config();
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const user = User.createIfNotExists({ chatId: msg.chat.id });

  const token = jwt.sign({ chatId: msg.chat.id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Установите время жизни токена
  });

  const appUrl = process.env.APP_URL.startsWith("http")
    ? process.env.APP_URL
    : `https://${process.env.APP_URL}`;

  bot.sendMessage(
    msg.chat.id,
    "Добро пожаловать! Для покупки VPN перейдите в веб-приложение",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Открыть приложение",
              web_app: {
                url: `${process.env.APP_URL}`,
                // url: `${process.env.APP_URL}&token=${token}`,
              },
            },
          ],
        ],
      },
    }
  );
  bot.sendMessage(msg.chat.id, token);
});

// Обработка других команд
bot.onText(/\/generate_config/, (msg) => {
  // Логика генерации конфигурационного файла WireGuard
});

bot.onText(/\/status/, (msg) => {
  // Логика получения статуса VPN
});

bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});
