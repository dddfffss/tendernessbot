const axios = require('axios');

// Указание токена бота
const botToken = '7822839883:AAGpnct2WADp29i4_u5s_txMAoeDxKBSPtc';

// Указание ID чата
const chatId = '1080261812';

// Функция для отправки сообщения
const sendMessage = async (message) => {
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

// Отправляем тестовое сообщение
sendMessage('Привет! Это тестовое сообщение от Telegram бота.');

