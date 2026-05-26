require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/admin', require('./routes/admin'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Что-то пошло не так!' });
});

// Database sync and server start
async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ База данных подключена');
    
    // Синхронизация моделей
    await sequelize.sync({ alter: true });
    console.log('✅ Модели синхронизированы');
    
    // Создание администратора если его нет
    const { User } = require('./models');
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    
    if (!adminExists) {
      await User.create({
        login: process.env.ADMIN_LOGIN || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        fullName: 'Администратор',
        phone: '+7(999)-999-99-99',
        email: 'admin@example.com',
        role: 'admin'
      });
      
      console.log('✅ Администратор создан');
      console.log(`   Логин: ${process.env.ADMIN_LOGIN || 'admin'}`);
      console.log(`   Пароль: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Ошибка при запуске сервера:', error);
    process.exit(1);
  }
}

start();
