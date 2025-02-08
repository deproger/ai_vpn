const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const PROMO_CODE = "kson";
const DEFAULT_PRICE = "290₽";
const DISCOUNT_PRICE = "190₽";

const countries = [
  { name: "🇺🇸 США", code: "us" },
  { name: "🇩🇪 Германия", code: "de" },
  { name: "🇯🇵 Япония", code: "jp" },
  { name: "🇷🇺 Россия", code: "ru" },
];

const userPromoStatus = {}; // Для отслеживания, применён ли промокод

// Команда /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Здравствуйте! 👋🏼\nЭто бот установки VPNTYPE 🤖\nОсталось нажать всего 4 кнопки, чтобы установить VPN 🎯\n\nПопробуйте наш VPN сервис - это бесплатно!🕊️",
    {
      reply_markup: {
        inline_keyboard: [[{ text: "🚀 Начать подключение", callback_data: "start_connection" }]],
      },
    }
  );
});

// Обработка кнопок
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === "start_connection") {
    bot.sendMessage(chatId, "Выберите сервер:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "⚡ Выбрать самый быстрый сервер", callback_data: "fastest_server" }],
          [{ text: "🌍 Выбрать сервер по стране", callback_data: "choose_country" }],
          [{ text: "🔗 Выбрать сервер по протоколу", callback_data: "choose_protocol" }],
        ],
      },
    });
  }

  if (data === "choose_country") {
    bot.sendMessage(chatId, "Все сервера по странам:", {
      reply_markup: {
        inline_keyboard: countries.map((country) => [
          { text: country.name, callback_data: `country_${country.code}` },
        ]),
      },
    });
  }

  if (data.startsWith("country_")) {
    const countryCode = data.split("_")[1];
    const country = countries.find((c) => c.code === countryCode);

    const price = userPromoStatus[chatId] ? DISCOUNT_PRICE : DEFAULT_PRICE;

    bot.sendMessage(chatId, `Данный сервер ${country.name} доступен только на Премиум тарифе.

Мы предоставляем 10 дней полного доступа к VPN всего за 1 рубль!

✔️ Подключение до 10 устройств
✔️ Скорость до 100 МБ/с
✔️ Надежные и безопасные соединения
✔️ 4 протокола (WireGuard, OpenVPN, VLESS, SS)
✔️ Доступ к более чем 50 странам и IP
✔️ Расширения для Chrome, Opera, Yandex

Просто попробуйте! 🚀

(Отменить подписку вы можете в любое время)
- - -
Тариф: Безлимит 1 месяц: ${price} в месяц
Бесплатно 10 дней`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: `💳 Оплатить (${price})`, callback_data: `pay_${countryCode}` }],
          [{ text: "🎟️ Ввести промокод", callback_data: `promo_${countryCode}` }],
          [{ text: "🔙 Вернуться к выбору серверов", callback_data: "start_connection" }],
        ],
      },
    });
  }

  if (data === "fastest_server") {
    const price = userPromoStatus[chatId] ? DISCOUNT_PRICE : DEFAULT_PRICE;

    bot.sendMessage(chatId, `⚡ Самый быстрый сервер: 🇹🇷 Стамбул доступен только на Премиум тарифе.

✔️ Подключение до 10 устройств
✔️ Скорость до 100 МБ/с
✔️ Надежные и безопасные соединения
✔️ 4 протокола (WireGuard, OpenVPN, VLESS, SS)
✔️ Доступ к более чем 50 странам и IP
✔️ Расширения для Chrome, Opera, Yandex

Просто попробуйте! 🚀

(Отменить подписку вы можете в любое время)
- - -
Тариф: Безлимит 1 месяц: ${price} в месяц
Бесплатно 10 дней`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: `💳 Оплатить (${price})`, callback_data: "pay_fastest" }],
          [{ text: "🎟️ Ввести промокод", callback_data: "promo_fastest" }],
          [{ text: "🔙 Вернуться к выбору серверов", callback_data: "start_connection" }],
        ],
      },
    });
  }

  if (data === "choose_protocol") {
    bot.sendMessage(chatId, "Выберите протокол:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🔐 WireGuard", callback_data: "protocol_wireguard" }],
          [{ text: "🔒 OpenVPN", callback_data: "protocol_openvpn" }],
          [{ text: "🌍 VLESS", callback_data: "protocol_vless" }],
          [{ text: "📡 Shadowsocks", callback_data: "protocol_shadowsocks" }],
        ],
      },
    });
  }

  if (data.startsWith("protocol_")) {
    const protocol = data.split("_")[1];
    const price = userPromoStatus[chatId] ? DISCOUNT_PRICE : DEFAULT_PRICE;

    bot.sendMessage(chatId, `Вы выбрали протокол: ${protocol.toUpperCase()}.

Этот протокол доступен только на Премиум тарифе.

✔️ Подключение до 10 устройств
✔️ Скорость до 100 МБ/с
✔️ Надежные и безопасные соединения
✔️ Доступ к более чем 50 странам и IP
✔️ Расширения для Chrome, Opera, Yandex

Просто попробуйте! 🚀

(Отменить подписку вы можете в любое время)
- - -
Тариф: Безлимит 1 месяц: ${price} в месяц
Бесплатно 10 дней`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: `💳 Оплатить (${price})`, callback_data: `pay_${protocol}` }],
          [{ text: "🎟️ Ввести промокод", callback_data: `promo_${protocol}` }],
          [{ text: "🔙 Вернуться к выбору серверов", callback_data: "start_connection" }],
        ],
      },
    });
  }

  if (data.startsWith("promo_")) {
    bot.sendMessage(chatId, "Введите промокод:");

    bot.once("message", (msg) => {
      if (msg.text.trim().toLowerCase() === PROMO_CODE) {
        userPromoStatus[chatId] = true;
        bot.sendMessage(chatId, "✅ Промокод успешно применён! Цена снижена.");
      } else {
        bot.sendMessage(chatId, "❌ Неверный промокод. Попробуйте ещё раз.");
      }
    });
  }

  if (data.startsWith("pay_")) {
    bot.sendMessage(chatId, "✅ Оплата успешно завершена!\n\nВы получили доступ к VPN. 🎉", {
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Вернуться к выбору серверов", callback_data: "start_connection" }]],
      },
    });

    if (userPromoStatus[chatId]) {
      delete userPromoStatus[chatId];
    }
  }
});
