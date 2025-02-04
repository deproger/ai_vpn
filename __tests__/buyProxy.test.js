// import request from "supertest";
// import express, { json } from "express";
// import { sign } from "jsonwebtoken";
// import router from "../routes/spaceproxyRoutes"; // Укажите путь к вашему маршруту
// require("dotenv").config();

// const app = express();
// app.use(json());
// app.use("/", router); // Подключите маршруты

// describe("POST /buyProxy", () => {
//   let token;

//   beforeAll(() => {
//     // Создание тестового токена
//     token = sign({ chatId: 12345 }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//   });

//   it("should return 401 if no token is provided", async () => {
//     const response = await request(app).post("/buyProxy").send({
//       country: "US",
//       period: 30,
//       quantity: 1,
//     });
//     expect(response.status).toBe(401);
//     expect(response.body.error).toBe("Токен не предоставлен");
//   });

//   it("should return 403 if the token is invalid", async () => {
//     const response = await request(app)
//       .post("/buyProxy")
//       .set("Authorization", "Bearer invalid_token")
//       .send({
//         country: "US",
//         period: 30,
//         quantity: 1,
//       });
//     expect(response.status).toBe(403);
//     expect(response.body.error).toBe("Недействительный токен");
//   });

//   it("should return 400 if required parameters are missing", async () => {
//     const response = await request(app)
//       .post("/buyProxy")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         country: "US",
//         // period, type, ip_version, and quantity are missing
//       });
//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe("Недостаточно данных для запроса");
//   });

//   it("should return 200 and the result if the request is valid", async () => {
//     const response = await request(app)
//       .post("/buyProxy")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         country: "US",
//         period: 30,
//         quantity: 1,
//       });
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("result"); // Замените "result" на ожидаемое свойство
//   });
// });
