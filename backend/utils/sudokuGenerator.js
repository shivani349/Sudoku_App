// sudokuGenerator.js
function generateSudoku(difficulty) {
    let board = Array(9).fill().map(() => Array(9).fill(0));
    let solvedBoard = JSON.parse(JSON.stringify(board));
    fillBoard(solvedBoard);
    let puzzle = JSON.parse(JSON.stringify(solvedBoard));
    removeNumbers(puzzle, difficulty);
    return { board: puzzle, solvedBoard };
  }
  
  function fillBoard(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          let numbers = shuffle([...Array(9).keys()].map(x => x + 1));
          for (let num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (
        board[row][i] === num ||
        board[i][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(i / 3)]
             [3 * Math.floor(col / 3) + i % 3] === num
      ) {
        return false;
      }
    }
    return true;
  }
  
  function removeNumbers(board, difficulty) {
    let attempts = difficulty === "easy" ? 30 : difficulty === "medium" ? 40 : 50;
    while (attempts > 0) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      board[row][col] = 0;
      attempts--;
    }
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  module.exports = { generateSudoku };
  