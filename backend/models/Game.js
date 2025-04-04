const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    board: [[Number]],
    solvedBoard: [[Number]],
    userBoard: [[Number]],
    difficulty: String, 
    startTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
