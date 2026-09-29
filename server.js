const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productsRoutes = require('./routes/productsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Главный роут
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API Grand Mobile работает!' });
});

// Маршруты товаров
app.use('/api/products', productsRoutes);

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Маршрут не найден' });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
