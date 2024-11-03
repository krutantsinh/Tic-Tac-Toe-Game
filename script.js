const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (event) => {
  const cellIndex = event.target.getAttribute('data-index');

  if (gameBoard[cellIndex] !== '' || !gameActive) return;

  gameBoard[cellIndex] = currentPlayer;
  event.target.innerText = currentPlayer;

  if (checkWin()) {
    statusText.innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    statusText.innerText = `It's a draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.innerText = `Player ${currentPlayer}'s turn`;
};

const checkWin = () => {
  return winningConditions.some(condition => {
    return condition.every(index => gameBoard[index] === currentPlayer);
  });
};

const checkDraw = () => {
  return gameBoard.every(cell => cell !== '');
};

const resetGame = () => {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.innerText = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => (cell.innerText = ''));
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

statusText.innerText = `Player ${currentPlayer}'s turn`;
