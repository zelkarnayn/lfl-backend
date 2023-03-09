const { Router } = require('express'); 
const newsController = require('../controllers/news.controller');
const postImageMiddleware = require ('../middleware/news.image')

const router = Router()

router.get("/news", newsController.getNews)
router.post('/news/add', postImageMiddleware.single("img"), newsController.createNews)
router.delete('/news/delete/:id', newsController.deleteNews)
module.exports = router;