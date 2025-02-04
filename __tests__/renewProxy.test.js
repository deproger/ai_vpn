const request = require("supertest");
const app = require("../app"); // Ваш файл с настройками Express
const jwt = require("jsonwebtoken");
require("dotenv").config();

describe("POST /renewProxy", () => {
  let token;

  beforeAll(() => {
    // Генерация токена для тестирования
    token = jwt.sign({ chatId: 234233254353 }, process.env.JWT_SECRET);
  });

  it("should return 200 and renewed proxies on successful renewal", async () => {
    const response = await request(app)
      .post("/renewProxy")
      .set("Authorization", `Bearer ${token}`)
      .send({
        proxies: [1656133], // Пример ID прокси для продления
        period: 5, // Период продления
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Ожидаем массив продленных прокси
    expect(response.body.length).toBeGreaterThan(0); // Ожидаем, что массив не пустой
  });

  it("should return 401 if token is not provided", async () => {
    const response = await request(app)
      .post("/renewProxy")
      .send({
        proxies: [1656133],
        period: 5,
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "Токен не предоставлен");
  });

  it("should return 403 if token is invalid", async () => {
    const response = await request(app)
      .post("/renewProxy")
      .set("Authorization", "Bearer invalidToken")
      .send({
        proxies: [1656133],
        period: 5,
      });

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("error", "Недействительный токен");
  });

  it("should return 400 if required parameters are missing", async () => {
    const response = await request(app)
      .post("/renewProxy")
      .set("Authorization", `Bearer ${token}`)
      .send({
        proxies: [12345], // Период отсутствует
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Недостаточно данных для запроса"
    );
  });
});
