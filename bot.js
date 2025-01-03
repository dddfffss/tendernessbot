const express = require("express");
const axios = require("axios");

const app = express();

// Замените на токен вашего Telegram-бота
const botToken = "7822839883:AAGpnct2WADp29i4_u5s_txMAoeDxKBSPtc";

// Укажите ваш Telegram chat ID
const chatId = "1080261812";

// Middleware для обработки JSON
app.use(express.json());

// Маршрут для получения данных от вашего сайта
app.post("/send-data", async (req, res) => {
    const { message } = req.body; // Получаем сообщение из тела запроса
    try {
        // Отправляем сообщение в Telegram
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
        });
        res.send("Сообщение отправлено в Telegram");
    } catch (error) {
        console.error("Ошибка отправки:", error.response.data);
        res.status(500).send("Ошибка при отправке сообщения");
    }
});

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
