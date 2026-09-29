const express = require('express');
const cors = require('cors'); // 1. Подключаем модуль CORS
require('dotenv').config();

const productsRoutes = require('./routes/productsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware (промежуточные обработчики)
app.use(cors()); // 2. Включаем CORS для всех входящих запросов
app.use(express.json());

// Маршруты API
app.use('/api/products', productsRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер Grand Mobile запущен: http://localhost:${PORT}`);
});