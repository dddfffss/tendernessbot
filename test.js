
const axios = require('axios');

// Указание токена бота
const botToken = '7822839883:AAG3g2Qkmieq-UVEb0HOJ7x-1_WTGp9zyng';

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

// Отправка сообщения с кнопок
module.exports = sendMessage;
    