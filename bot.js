const express = require("express");
const axios = require("axios");

const app = express();

// Укажите токен вашего Telegram-бота
const botToken = "7822839883:AAGpnct2WADp29i4_u5s_txMAoeDxKBSPtc";
// Укажите ваш Telegram chat ID
const chatId = "1080261812";

// Middleware для обработки JSON
app.use(express.json());

// Маршрут для проверки работы сервера
app.get("/", (req, res) => {
    res.send("Сервер работает! Telegram-бот запущен 🚀");
});

// Маршрут для получения данных от вашего сайта
app.post("/send-data", async (req, res) => {
    const { message } = req.body; // Получаем данные из тела запроса

    if (!message) {
        res.status(400).send("Поле 'message' отсутствует в запросе.");
        return;
    }

    console.log("Получено сообщение:", message);

    try {
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
        });

        console.log("Ответ от Telegram API:", response.data);
        res.send("Сообщение отправлено в Telegram");
    } catch (error) {
        console.error(
            "Ошибка при отправке сообщения в Telegram:",
            error.response?.data || error.message
        );
        res.status(500).send("Ошибка при отправке сообщения.");
    }
});

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
