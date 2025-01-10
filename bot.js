const express = require('express');
const axios = require('axios');

const app = express();

// Функция для отправки сообщения
const sendMessage = async (message) => {
    const botToken = process.env.BOT_TOKEN; // Получаем токен из переменных окружения
    const chatId = process.env.CHAT_ID; // Получаем chat_id из переменных окружения

    try {
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
        });
        console.log('Сообщение успешно отправлено:', response.data);
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error.response ? error.response.data : error.message);
    }
};

// Роут для обработки запроса и отправки сообщения
app.get('/test', async (req, res) => {
    await sendMessage('Кто-то зашёл на сайт! 🎉'); // Отправляем сообщение
    res.send('Сообщение отправлено в Telegram!');
});

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
