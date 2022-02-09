const express = require('express')
const  router = express.Router()
const { requireAuth, CheckUser } = require('../middleware/authMiddleware')


router.get('*', CheckUser )

router.get('/', (req,res)=>{
    res.render('home',{
        layout : 'loginl',
    })
})
router.get('/dashboard',requireAuth,  (req,res)=>{
    res.render('dashboard')
})


module.exports = router