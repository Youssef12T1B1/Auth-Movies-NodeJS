const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title :{
         type: String,
         required: true,
         trim: true,
         
    },
    body : {
        type: String,
        required: true,
       
       

    },
    status : {
        type: String,
        default: 'public',
        enum: ['public','private']
        
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }   
},{ timestamps: true}); 

const Movie = mongoose.model('movie', movieSchema);

module.exports= Movie