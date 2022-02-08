const User = require('../models/User')
 
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
          return errors;
      }

      if(err.message.includes('admin validation failed')){
          Object.values(err.errors).forEach(({properties})=>{
              errors[properties.path] = properties.message;

          });
      }
        return errors;
    }


module.exports.signup_get = (req,res)=>{

    res.render('signup')
}

module.exports.signup_post = async (req,res)=>{
const username = 'joe'
const email = 'joe@gmail.Com'
const password = 'joejoee1'

try{
    const user = await User.create({username,email,password})
    res.status(201).json(user)
} 
catch (err){
console.log(err);
res.status(400).send('user not creared')
}
}
module.exports.login_get = (req,res)=>{

    res.render('login')
}
module.exports.login_post = (req,res)=>{

    res.send(' login')
}