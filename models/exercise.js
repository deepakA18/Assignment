const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  language: { 
    type: String,
    required: true }, 

  difficultyLevel: { 
    type: Number,
    required: true }, 

  question: { 
    type: String,
     required: true },
     
  correctAnswer: { 
    type: String, 
    required: true },

  options: [{ type: String, required: true }],
});

module.exports = mongoose.model('Exercise', exerciseSchema);
