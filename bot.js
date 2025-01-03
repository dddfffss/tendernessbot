const express = require("express");
const axios = require("axios");

const app = express();

const botToken = "7822839883:AAGpnct2WADp29i4_u5s_txMAoeDxKBSPtc"; // Укажите токен Telegram-бота
const chatId = "1080261812"; // Укажите ID чата

// Middleware для обработки JSON
app.use(express.json());

// Маршрут для проверки работы сервера
app.get("/", (req, res) => {
    console.log("GET запрос к /");
    res.send("Сервер работает! Telegram-бот запущен 🚀");
});

// Маршрут для получения данных от клиента
app.post("/send-data", async (req, res) => {
    const { message } = req.body; // Получаем сообщение из тела запроса

    if (!message) {
        console.error("Ошибка: Поле 'message' отсутствует.");
        return res.status(400).send("Поле 'message' отсутствует.");
    }

    console.log("Получено сообщение:", message);

    try {
        // Отправка сообщения в Telegram
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
        });
        console.log("Ответ от Telegram API:", response.data);
        res.send("Сообщение отправлено в Telegram.");
    } catch (error) {
        console.error("Ошибка при отправке сообщения в Telegram:", error.response?.data || error.message);
        res.status(500).send("Ошибка при отправке сообщения.");
    }
});

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
