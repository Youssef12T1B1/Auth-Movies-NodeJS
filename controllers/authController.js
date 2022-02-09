const User = require('../models/User')
const jwt = require('jsonwebtoken');

//handle errors 
const handleErr = (err) =>{
     
    console.log(err.message , err.code);
      let errors = { email:'', password:''};

      if(err.message === 'incorrect email'){
          errors.email = 'Incorrect email Please try again ';
          return errors;

      }
      if(err.message === 'incorrect password'){
        errors.password = 'Incorrect password';
        return errors;

    }


      if(err.code === 11000){
          errors.email = 'that email is already used';
          errors.username = 'that username is already used'
          return errors;
      }

      if(err.message.includes('admin validation failed')){
          Object.values(err.errors).forEach(({properties})=>{
              errors[properties.path] = properties.message;

          });
      }
        return errors;
    }


    const maxDate = 1*24*60*60;
    const CreateToken = (id) =>{
       return jwt.sign({id}, 'Joe Project', {
           expiresIn: maxDate,
       });
    }    


module.exports.signup_get = (req,res)=>{

    res.render('signup')
}

module.exports.signup_post = async (req,res)=>{

const {username, email, password} = req.body

try{
    const user = await User.create({username,email,password})
    const token =  CreateToken(user._id);
      res.cookie('jwt', token, {httpOnly:true, maxAge : maxDate * 1000});
      res.status(201).json({user: user._id})
} 
catch (err){
 const errors = handleErr(err)
 res.status(400).json({errors})
}

}

module.exports.login_get = (req,res)=>{

    res.render('login')
}

module.exports.login_post = async (req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);
        const token =  CreateToken(user._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge : maxDate * 1000});
        res.status(201).json( { user: user._id }); 
        
     }
     catch (err){
        const errors =  handleErr(err);
        res.status(400).json({ errors });
     }
}

module.exports.logout = (req,res)=>{

    res.cookie('jwt','',{maxAge: 1})
    res.redirect('/')
}