const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true, 
    },
    password:{
        type: String,
        required: true,
    },
    languagePreference:{
        type: String,
        required: true,
    },
    exerciseCompleted: [{
         type: mongoose.Schema.Types.ObjectId, 
        ref: 'Exercise' }],
      
})

const User = mongoose.model('User', userSchema);
module.exports = User;
