const express = require('express')
const { render } = require('express/lib/response')
const  router = express.Router()
const { requireAuth, CheckUser } = require('../middleware/authMiddleware')

const Movie = require('../models/Movie')



router.get('/add', requireAuth, (req,res)=>{
    res.render('movies/add')
})



module.exports = router