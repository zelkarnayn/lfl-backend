const mongoose = require('mongoose')

const newsShema = mongoose.Schema({
    title: String,
    image: String,
    text: String
})

const News = mongoose.model('News', newsShema)
module.exports = News