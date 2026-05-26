const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function prepareForNpm() {
  console.log('📦 Подготовка к публикации в npm...\n');

  const tempDir = path.join(__dirname, '..', 'npm-package');
  
  // Очищаем временную директорию
  await fs.remove(tempDir);
  await fs.ensureDir(tempDir);

  // Копируем CLI
  await fs.copy(
    path.join(__dirname, '..', 'cli'),
    path.join(tempDir, 'cli')
  );

  // Создаем templates/base
  const templatesDir = path.join(tempDir, 'templates', 'base');
  await fs.ensureDir(templatesDir);

  // Копируем основные директории
  const dirs = ['client', 'server', 'scripts'];
  for (const dir of dirs) {
    console.log(`📁 Копирование ${dir}...`);
    await fs.copy(
      path.join(__dirname, '..', dir),
      path.join(templatesDir, dir),
      {
        filter: (src) => {
          // Исключаем node_modules и другие ненужные файлы
          if (src.includes('node_modules')) return false;
          if (src.includes('.env') && !src.endsWith('.env.example')) return false;
          if (src.includes('dist')) return false;
          if (src.includes('build')) return false;
          return true;
        }
      }
    );
  }

  // Копируем корневые файлы для шаблона
  const rootFiles = [
    'package.json',
    'README.md',
    '.gitignore'
  ];

  for (const file of rootFiles) {
    const src = path.join(__dirname, '..', file);
    const dest = path.join(templatesDir, file);
    if (await fs.pathExists(src)) {
      await fs.copy(src, dest);
    }
  }

  // Копируем package.json для npm
  await fs.copy(
    path.join(__dirname, '..', 'cli-package.json'),
    path.join(tempDir, 'package.json')
  );

  // Копируем README для npm
  const npmReadme = `# create-exam-app

> Создайте проект для демонстрационного экзамена за 30 секунд!

## 🚀 Использование

\`\`\`bash
npx create-exam-app my-project
\`\`\`

Или для конкретного варианта:

\`\`\`bash
# Вариант 1: Буквоежка
npx create-exam-app my-project --variant variant1 --yes

# Вариант 2: Грузовозофф
npx create-exam-app my-project --variant variant2 --yes

# Вариант 3: Корочки.есть
npx create-exam-app my-project --variant variant3 --yes

# Вариант 4: Я буду кушац
npx create-exam-app my-project --variant variant4 --yes
\`\`\`

## 📚 Варианты

- **variant1**: Буквоежка - система обмена книгами
- **variant2**: Грузовозофф - система грузоперевозок
- **variant3**: Корочки.есть - система онлайн курсов
- **variant4**: Я буду кушац - система бронирования столиков
- **universal**: Универсальный шаблон

## 🛠 Технологии

- React 18 + Vite
- Express + Sequelize
- PostgreSQL
- Tailwind CSS
- JWT Authentication

## 📝 Лицензия

MIT
`;

  await fs.writeFile(path.join(tempDir, 'README.md'), npmReadme);

  // Создаем LICENSE
  const license = `MIT License

Copyright (c) ${new Date().getFullYear()} Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

  await fs.writeFile(path.join(tempDir, 'LICENSE'), license);

  console.log('\n✅ Пакет готов к публикации!');
  console.log(`📁 Расположение: ${tempDir}`);
  console.log('\nДля публикации выполните:');
  console.log(`  cd npm-package`);
  console.log(`  npm publish`);
}

prepareForNpm().catch(console.error);
