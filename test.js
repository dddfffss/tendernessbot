const axios = require("axios");

const botToken = "7822839883:AAGpnct2WADp29i4_u5s_txMAoeDxKBSPtc";
const chatId = "1080261812";
const message = "Тестовое сообщение";

axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    chat_id: chatId,
    text: message
}).then(response => {
    console.log("Сообщение отправлено:", response.data);
}).catch(error => {
    console.error("Ошибка отправки:", error.response ? error.response.data : error.message);
});
