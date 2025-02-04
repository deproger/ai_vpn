const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../models/User");
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Список доступных стран
const countries = [
  { name: "🇺🇸 США", code: "us" },
  { name: "🇩🇪 Германия", code: "de" },
  { name: "🇯🇵 Япония", code: "jp" },
  { name: "🇷🇺 Россия", code: "ru" },
];

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const user = User.createIfNotExists({ chatId: msg.chat.id });

  const token = jwt.sign({ chatId: msg.chat.id }, process.env.JWT_SECRET, {
    expiresIn: "6h",
  });

  bot.sendMessage(
    msg.chat.id,
    "Добро пожаловать! Выберите страну для покупки VPN конфигурации:",
    {
      reply_markup: {
        inline_keyboard: countries.map((country) => [
          {
            text: country.name,
            callback_data: `select_country_${country.code}`,
          },
        ]),
      },
    }
  );
});

// Обработка выбора страны
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const countryCode = query.data.split("_")[2];

  if (query.data.startsWith("select_country_")) {
    bot.sendMessage(
      chatId,
      `Вы выбрали страну: ${
        countries.find((c) => c.code === countryCode).name
      }. Теперь выберите способ оплаты:`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Оплатить через Юкасса (заглушка)",
                callback_data: `pay_youkassa_${countryCode}`,
              },
            ],
          ],
        },
      }
    );
  }

  // Обработка оплаты через Stripe (заглушка)
  if (query.data.startsWith("pay_youkassa_")) {
    const selectedCountryCode = query.data.split("_")[2];
    bot.sendMessage(
      chatId,
      `Оплата через Юкасса для страны ${
        countries.find((c) => c.code === selectedCountryCode).name
      }. Это заглушка. Нажмите "Продолжить", чтобы получить конфигурацию.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Продолжить",
                callback_data: `continue_${selectedCountryCode}`,
              },
            ],
          ],
        },
      }
    );
  }

  // Обработка продолжения (заглушка)
  if (query.data.startsWith("continue_")) {
    const selectedCountryCode = query.data.split("_")[1];
    handlePaymentSuccess(chatId, selectedCountryCode);
  }
});

// Генерация и отправка конфигурации
function generateConfig(chatId, countryCode) {
  const config = `Конфигурация для страны: ${
    countries.find((c) => c.code === countryCode).name
  }`;
  const filePath = `./configs/${countryCode}.conf`;

  fs.writeFileSync(filePath, config);

  bot.sendDocument(chatId, fs.createReadStream(filePath), {
    caption: "Ваш конфигурационный файл для VPN.",
  });
}

// Обработка успешной оплаты (заглушка)
function handlePaymentSuccess(chatId, countryCode) {
  generateConfig(chatId, countryCode);
}

// Обработка ошибок
bot.on("polling_error", (error) => {
  console.error("Polling error:", error);
});
