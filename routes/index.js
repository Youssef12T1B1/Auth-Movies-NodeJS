const express = require('express')
const  router = express.Router()

router.get('/', (req,res)=>{
    res.render('home',{
        layout : 'loginl',
    })
})
router.get('/dashboard', (req,res)=>{
    res.render('dashboard')
})

router.get('/login', (req,res)=>{
    res.render('login')
})
router.get('/signup', (req,res)=>{
    res.render('signup')
})
module.exports = router