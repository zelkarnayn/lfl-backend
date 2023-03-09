const Fighter = require("../models/Fighter.model")
const fs = require('fs')

module.exports.fightersController = {
    addFighterImage: async (req, res) => {
        try {
            if(req.file.path) {
                res.json(req.file.path)
            }
        } catch (error) {
            res.json({error: error.message})
        }
    },
    addFighter: async (req, res) => {
        try {
            const fighter = await Fighter.create(req.body)
            res.json(fighter)
        } catch (error) {
            res.json({ error: error.message })
        }
    },
    getFighters: async (req, res) => {
        try {
            const fighter = await Fighter.find()
            res.json(fighter)
        } catch (error) {
            res.json({ error: error.message })
        }
    },
    deleteFighter: async (req, res) => {
        try {
            const fighterImg = await Fighter.findById(req.params.id)
            const filePath = fighterImg.image
            fs.unlink(filePath, function(err) {
                if(err && err.code == 'ENOENT') {
                    console.info("Файл не найден.");
                } else if (err) {
                    console.error("Ошибка при удалении файла");
                } else {
                    console.info(`Файл удален`);
                }
            })
            const fighter = await Fighter.findByIdAndDelete(req.params.id);
            res.json(fighter);
        } catch (error) {
            res.json(error.message);
        }
    }
}