const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const { generateSudoku } = require('../utils/sudokuGenerator');

router.get('/new/:difficulty', async (req, res) => {
    const { difficulty } = req.params;
    const puzzle = generateSudoku(difficulty);
    
    const newGame = new Game({
        board: puzzle.board,
        solvedBoard: puzzle.solvedBoard,
        userBoard: puzzle.board,
        difficulty
    });

    await newGame.save();
    res.json(newGame);
});

router.get('/:id', async (req, res) => {
    const game = await Game.findById(req.params.id);
    res.json(game);
});

router.post('/:id', async (req, res) => {
    const { userBoard } = req.body;
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, { userBoard }, { new: true });
    res.json(updatedGame);
});

module.exports = router;
