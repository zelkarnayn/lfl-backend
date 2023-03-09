const { Router } = require('express')
const { fightersController } = require('../controllers/fighters.controller')
const router = Router()
const imageMiddleware = require('../middleware/fighter.image')

router.get('/fighters', fightersController.getFighters)
router.post('/fighters', fightersController.addFighter)
router.post('/image', imageMiddleware.single('avatar'), fightersController.addFighterImage)
router.delete('/fighters/delete/:id', fightersController.deleteFighter)

module.exports = router