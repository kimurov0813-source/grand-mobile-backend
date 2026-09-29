const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Встроенный тестовый маршрут (без внешних файлов)
app.get('/api/test', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Тестовый маршрут работает прямо из server.js!'
  });
});

// 2. Подключение роутов товаров
try {
  const productsRoutes = require('./routes/productsRoutes');
  app.use('/api/products', productsRoutes);
  console.log('✅ Маршруты /api/products успешно подключены');
} catch (err) {
  console.error('❌ Ошибка при импорте routes/productsRoutes:', err.message);
}

// 3. Отладочный обработчик 404 (перехватывает все неизвестные пути)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Маршрут не найден',
    requestedUrl: req.originalUrl,
    method: req.method,
    hint: 'Проверьте /api/test или /api/products'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});
