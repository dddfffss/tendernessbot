const express = require('express');
const axios = require('axios');

const app = express();

// Функция для отправки сообщений
const sendMessage = async (message) => {
    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

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

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
