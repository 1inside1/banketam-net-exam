const fs = require('fs');
const path = require('path');

const variant = process.argv[2];

if (!variant) {
  console.error('Пожалуйста, укажите вариант: 1, 2, 3, 4 или universal');
  process.exit(1);
}

const variantMap = {
  '1': 'variant1',
  '2': 'variant2', 
  '3': 'variant3',
  '4': 'variant4',
  'universal': 'universal'
};

const variantName = variantMap[variant];

if (!variantName) {
  console.error('Неверный вариант. Используйте: 1, 2, 3, 4 или universal');
  process.exit(1);
}

// Обновляем localStorage через создание временного файла
const setupScript = `
// Этот файл создан автоматически для настройки варианта ${variant}
// Он будет загружен при запуске приложения
window.localStorage.setItem('currentVariant', '${variantName}');
console.log('Установлен вариант: ${variantName}');
`;

const publicPath = path.join(__dirname, '..', 'client', 'public');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

fs.writeFileSync(
  path.join(publicPath, 'variant-setup.js'),
  setupScript
);

// Создаем .env файл для сервера с соответствующими данными админа
const variants = {
  variant1: {
    name: 'Буквоежка',
    adminLogin: 'admin',
    adminPassword: 'bookworm'
  },
  variant2: {
    name: 'Грузовозофф',
    adminLogin: 'admin',
    adminPassword: 'gruzovik2024'
  },
  variant3: {
    name: 'Корочки.есть',
    adminLogin: 'admin',
    adminPassword: 'education'
  },
  variant4: {
    name: 'Я буду кушац',
    adminLogin: 'admin',
    adminPassword: 'restaurant'
  },
  universal: {
    name: 'Универсальная система',
    adminLogin: 'admin',
    adminPassword: 'admin123'
  }
};

const selectedVariant = variants[variantName];

const envContent = `# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=exam_db_${variantName}
DB_USER=postgres
DB_PASSWORD=your_password

# Server
PORT=5000

# JWT
JWT_SECRET=your_super_secret_key_${variantName}_${Date.now()}

# Admin credentials
ADMIN_LOGIN=${selectedVariant.adminLogin}
ADMIN_PASSWORD=${selectedVariant.adminPassword}
`;

const envPath = path.join(__dirname, '..', 'server', '.env');
fs.writeFileSync(envPath, envContent);

// Создаем скрипт инициализации БД
const initDbScript = `
require('dotenv').config();
const sequelize = require('./config/database');
const { User } = require('./models');
const bcrypt = require('bcryptjs');

async function initDb() {
  try {
    await sequelize.sync({ force: true });
    console.log('База данных создана');
    
    // Создаем администратора
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('${selectedVariant.adminPassword}', salt);
    
    await User.create({
      login: '${selectedVariant.adminLogin}',
      password: hashedPassword,
      fullName: 'Администратор',
      phone: '+7(999)-999-99-99',
      email: 'admin@example.com',
      role: 'admin'
    });
    
    console.log('Администратор создан');
    console.log('Логин: ${selectedVariant.adminLogin}');
    console.log('Пароль: ${selectedVariant.adminPassword}');
    
    process.exit(0);
  } catch (error) {
    console.error('Ошибка инициализации БД:', error);
    process.exit(1);
  }
}

initDb();
`;

fs.writeFileSync(
  path.join(__dirname, '..', 'server', 'init-db.js'),
  initDbScript
);

// Обновляем index.html для подключения скрипта настройки
const indexPath = path.join(__dirname, '..', 'client', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Добавляем скрипт если его еще нет
if (!indexContent.includes('variant-setup.js')) {
  indexContent = indexContent.replace(
    '</head>',
    '  <script src="/variant-setup.js"></script>\n  </head>'
  );
  fs.writeFileSync(indexPath, indexContent);
}

console.log(`
✅ Вариант "${selectedVariant.name}" успешно настроен!

Теперь выполните следующие шаги:

1. Создайте базу данных PostgreSQL с именем: exam_db_${variantName}
   
2. Обновите пароль PostgreSQL в файле server/.env

3. Инициализируйте базу данных:
   cd server && node init-db.js

4. Запустите проект:
   npm run dev

Данные администратора:
- Логин: ${selectedVariant.adminLogin}
- Пароль: ${selectedVariant.adminPassword}
`);
