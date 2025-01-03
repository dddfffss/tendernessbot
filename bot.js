const express = require("express");
const axios = require("axios");

const app = express();

// Укажите токен вашего Telegram-бота
const botToken = "ВАШ_ТОКЕН_БОТА"; // Замените на ваш токен
const chatId = "ВАШ_CHAT_ID"; // Укажите ваш Telegram chat ID

// Middleware для обработки JSON
app.use(express.json());

// Маршрут для проверки работы сервера
app.get("/", (req, res) => {
    res.send("Сервер работает! Telegram-бот запущен 🚀");
});

// Маршрут для получения данных и отправки их в Telegram
app.post("/send-data", async (req, res) => {
    const { message } = req.body; // Получаем данные из тела запроса

    if (!message) {
        res.status(400).send("Поле 'message' отсутствует в запросе");
        return;
    }

    try {
        // Отправляем сообщение в Telegram
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
        });

        res.send("Сообщение отправлено в Telegram");
    } catch (error) {
        console.error("Ошибка при отправке сообщения в Telegram:", error.response?.data || error.message);
        res.status(500).send("Ошибка при отправке сообщения в Telegram");
    }
});

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
