// Подключаем необходимые модули
const express = require('express');
const mysql = require('mysql');

// Создаем приложение Express
const app = express();

// Настраиваем соединение с базой данных MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Хост базы данных
  user: 'ваш_пользователь', // Пользователь базы данных
  password: 'ваш_пароль', // Пароль базы данных
  database: 'название_базы_данных' // Название базы данных
});

// Подключаемся к базе данных
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ' + err.stack);
    return;
  }
  console.log('Успешное подключение к базе данных');
});

// Маршрут для вывода списка продуктов
app.get('/products', (req, res) => {
  // Запрос к базе данных для получения списка продуктов
  connection.query('SELECT product, price FROM products', (error, results, fields) => {
    if (error) {
      console.error('Ошибка выполнения запроса: ' + error.message);
      res.status(500).send('Ошибка сервера');
      return;
    }
    // Отправляем список продуктов в формате JSON
    res.json(results);
  });
});

// Запускаем сервер на порте 3000
app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
