const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
 },

  exercise: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Exercise', 
    required: true 
},

  score: { 
    type: Number, 
    required: true, 
}, // Score for the exercise (0-5)

  timestamp: { 
    type: Date, 
    default: Date.now,
 }, // Timestamp of when the exercise was completed
});

module.exports = mongoose.model('UserProgress', userProgressSchema);
