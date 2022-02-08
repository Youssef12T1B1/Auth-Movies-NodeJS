const mongoose = require('mongoose')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username :{
         type: String,
         required: true,
         unique : true,
         lowercase: true
    },
    email : {
        type: String,
        required: true,
        unique : true,
        lowercase: true,
        validate: [isEmail , 'Please Entre a valide Email']

    },
    password : {
        type: String,
        required: [true, 'Please entre an password'],
        minlength : [6, 'Minimum password length is 6 characters'],
        
    }
     
},{ timestamps: true}); 

const User = mongoose.model('user', userSchema);

module.exports= User