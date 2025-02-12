
const express = require('express');
const bodyParser = require('body-parser');
const sendMessage = require('./test.js');

const app = express();
app.get('/sendMessage', async (req, res) => {
    const message = req.query.message || 'Тестовое сообщение!'; // Получение текста сообщения из параметра ?message=
    await sendMessage(message); // Отправляем сообщение в Telegram
    res.send('Сообщение отправлено!');
});

});

app.use(bodyParser.json());

app.post('/sendMessage', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).send('Отсутствует текст сообщения');
    await sendMessage(message);
    res.send('Сообщение отправлено!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    