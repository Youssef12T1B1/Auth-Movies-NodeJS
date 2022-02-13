const express = require('express')
const { render } = require('express/lib/response')
const  router = express.Router()
const { requireAuth, CheckUser } = require('../middleware/authMiddleware')
const movieController = require('../controllers/movieController')





router.get('/movies/add', requireAuth, movieController.add_get)

router.post('/movies/add',CheckUser,  movieController.add_post )

module.exports = router