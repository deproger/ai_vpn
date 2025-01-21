const axios = require("axios");
const pool = require("../config/database"); // Импортируйте ваш экземпляр базы данных
const Proxy = require("../models/Proxy");
require("dotenv").config();

const API_KEY = process.env.API_KEY; // API ключ
const API_URL = "https://panel.spaceproxy.net/api/new-order/";

const buyProxy = async (chatId, country, period, quantity = 1) => {
  try {
    // Логируем входные параметры
    console.log("Parameters:", { country, period, quantity });

    // Отправка POST-запроса с правильным форматом
    const response = await axios.post(`${API_URL}?api_key=${API_KEY}`, {
      type: "dedicated", // Исправлено с "dedicatead" на "dedicated"
      ip_version: 6,
      country: country,
      period: period, // 5, 10, 20, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360
      quantity: quantity,
    });

    // Обработка ответа
    console.log("Response data:", response.data);

    // Получение данных о созданных прокси
    const proxies = response.data;

    // Сохранение информации о заказе в базе данных
    for (const proxy of proxies) {
      const {
        id,
        internal_ip,
        port_http,
        port_socks5,
        user,
        password,
        order_id,
      } = proxy;

      const proxyData = {
        id,
        ip: internal_ip,
        port_http,
        period,
        port_socks5,
        user,
        password,
        order_id,
        country,
      };

      console.log("Proxy Data:", proxyData);

      // Сохранение в базу данных
      await Proxy.create(proxyData);
    }

    return proxies; // Возвращаем информацию о созданных прокси
  } catch (error) {
    console.error(
      "Error buying proxy:",
      error.response ? error.response.data : error.message
    );
    throw error.response; // Пробрасываем ошибку дальше
  }
};

module.exports = { buyProxy };
