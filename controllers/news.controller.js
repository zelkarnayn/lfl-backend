const News = require("../models/News.model");
const fs = require('fs')

const newsController = {
    getNews: async (req, res) => {
        try {
            const news = await News.find();
            res.json(news);
        } catch (error) {
            res.json(error.message);
        }
    },
    createNews: async (req, res) => {
        try {
            const { title, text } = req.body;
            const news = await News.create({
                title,
                image: req.file.path,
                text
            });
            res.json(news);
        } catch (error) {
            res.json(error.message);
        }
    },
    deleteNews: async (req, res) => {
        try {
            const newsImg = await News.findById(req.params.id)
            const filePath = newsImg.image
            fs.unlink(filePath, function(err) {
                if(err && err.code == 'ENOENT') {
                    console.info("Файл не найден.");
                } else if (err) {
                    console.error("Ошибка при удалении файла");
                } else {
                    console.info(`Файл удален`);
                }
            })
            const news = await News.findByIdAndDelete(req.params.id);
            res.json(news);
        } catch (error) {
            res.json(error.message);
        }
    },
    addImage: async (req, res) => {
        try {
            if (req.files) {
                res.json(req.files);
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    },
};

module.exports = newsController;
