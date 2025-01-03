const express = require("express");
const axios = require("axios");

const app = express();

// Укажите токен вашего Telegram-бота
const botToken = "7822839883:AAGpnct2WADp29i4_u5s_txMAoeDxKBSPtc"; // Замените на ваш токен
const chatId = "1080261812"; // Укажите ваш Telegram chat ID

// Middleware для обработки JSON
app.use(express.json());

// Маршрут для проверки работы сервера
app.get("/", async (req, res) => {
    // Отправляем уведомление в Telegram
    try {
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: "Кто-то зашел на сайт! 🌐",
        });
        console.log("Уведомление отправлено в Telegram:", response.data);
    } catch (error) {
        console.error("Ошибка при отправке уведомления в Telegram:", error.response?.data || error.message);
    }

    res.send("Сервер работает! Telegram-бот запущен 🚀");
});


// Маршрут для получения данных и отправки их в Telegram
app.post("/send-data", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        res.status(400).send("Поле 'message' отсутствует в запросе");
        return;
    }

    console.log("Получено сообщение:", message);

    try {
        // Отправляем сообщение в Telegram
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message,
        });

        console.log("Ответ от Telegram API:", response.data);
        res.send("Сообщение отправлено в Telegram");
    } catch (error) {
        console.error("Ошибка при отправке сообщения в Telegram:", error.response?.data || error.message);
        res.status(500).send("Ошибка при отправке сообщения");
    }
});

// Запуск сервера
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
