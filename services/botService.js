const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
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
              },
            },
          ],
        ],
      },
    }
  );
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
