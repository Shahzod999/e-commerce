import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadsRouts from "./routes/uploadsRouts.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
//dotenv.config(): Загружает переменные окружения из файла .env в process.env. Это позволяет использовать их в приложении.
const port = process.env.PORT || 5000;

connectDB(); //наша функция в DB.js

const app = express();

// Использование Middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.json());: Этот middleware парсит JSON-тела запросов, чтобы вы могли легко получать данные из запросов с JSON-данными (например, при отправке формы с фронтенда).
// app.use(express.urlencoded({ extended: true }));: Этот middleware парсит данные из формы (формат application/x-www-form-urlencoded). Параметр extended: true позволяет обрабатывать сложные структуры данных, такие как вложенные объекты.
// app.use(cookieParser());: Этот middleware позволяет вашему приложению работать с cookies, парсить их и сохранять в req.cookies.
//Middleware end

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadsRouts);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
