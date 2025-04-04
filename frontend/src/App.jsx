import { useEffect, useState } from 'react';
import axios from 'axios';
import Board from './Board';
import './App.css';

const App = () => {
  const [game, setGame] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const fetchGame = async () => {
    const res = await axios.get(`http://localhost:5000/api/sudoku/new?difficulty=${difficulty}`);
    setGame(res.data);
    clearInterval(intervalId);
    setTimer(0);
    const id = setInterval(() => setTimer((prev) => prev + 1), 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    fetchGame();
    return () => clearInterval(intervalId);
  }, [difficulty]);

  const handleChange = (row, col, value) => {
    const updatedBoard = [...game.userBoard];
    updatedBoard[row][col] = value === '' ? 0 : parseInt(value);
    setGame({ ...game, userBoard: updatedBoard });
  };

  const handleClear = () => {
    const clearedBoard = game.userBoard.map((row, i) =>
      row.map((cell, j) => (game.board[i][j] === 0 ? 0 : cell))
    );
    setGame({ ...game, userBoard: clearedBoard });
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Sudoku Game</h1>
        <div className="timer">Time: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</div>
      </div>

      <div className="controls">
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={fetchGame}>New Game</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {game && <Board userBoard={game.userBoard} onChange={handleChange} />}
    </div>
  );
};

export default App;
