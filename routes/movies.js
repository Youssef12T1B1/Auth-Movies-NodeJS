const express = require('express')
const { render } = require('express/lib/response')
const  router = express.Router()
const { requireAuth, CheckUser } = require('../middleware/authMiddleware')

const Movie = require('../models/Movie')


const maxDate = 1*24*60*60;
const CreateToken = (id) =>{
   return jwt.sign({id}, 'Joe Project', {
       expiresIn: maxDate,
   });
}    

router.get('/add', requireAuth, (req,res)=>{
    res.render('movies/add')
})

router.post('/movies', requireAuth, async (req,res)=>{
    const {email, status, body} = req.body;
    const user = req.user._id;

    try{
        const movie = await Movie.create(email, status, body, user);
        const token =  CreateToken(movie._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge : maxDate * 1000});
        res.status(201).json( { movie: movie._id }); 
        
     }
     catch (err){
       console.log('errrrr');
     }
})

module.exports = router