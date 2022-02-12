const Movie = require('../models/Movie')
const jwt = require('jsonwebtoken');

const maxDate = 1*24*60*60;
const CreateToken = (id) =>{
   return jwt.sign({id}, 'Joe Project', {
       expiresIn: maxDate,
   });
}    

module.exports.add_get = (req,res)=>{
    res.render('movies/add')
}

module.exports.add_post = async (req,res)=>{
    const {email, body, status} = req.body;
    const user = req.user._id;

    try{
        const movie = await Movie.create({email, body, status, user});
        const token =  CreateToken(movie._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge : maxDate * 1000});
        res.status(201).json( { movie: movie._id }); 
        
     }
     catch (err){
       console.log('errrrr');
     }


}

