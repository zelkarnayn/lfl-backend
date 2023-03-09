const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
require('dotenv').config()
mongoose.set('strictQuery', true)

app.get('/users', (req, res) => {
    res.send([{
        id: 1,
        name: 'Zelemh',
        age: 32
    },
    {
        id: 2,
        name: 'Fatima',
        age: 29
    }
])
})

app.use("/files", express.static(__dirname + "/files"));
app.use(cors())
app.use(express.json())
app.use(require('./routes/news.route'))
app.use(require('./routes/categories.route'))
app.use(require('./routes/fighters.route'))

const port = 4000
const url = 'mongodb+srv://zelamh:12345@idle.pf4sfyx.mongodb.net/lfl?retryWrites=true&w=majority'
const server = async () => {
    try {
        app.listen(port, () => console.log('Сервер успешно запущен'))
        mongoose.connect(url, () => {
            console.log('Успешное соединение с БД');
        })
    } catch (error) {
        console.log(error.message);
    }
}

server()