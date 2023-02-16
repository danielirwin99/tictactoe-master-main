const allSquares = document.querySelectorAll(".board__square");
const title = document.querySelector(".board__title");

let currentPlayer = "X";

let board = new Array(9);

let gameOver = false;

allSquares.forEach((square, i) => {
  square.addEventListener("click", () => {
    if (gameOver || square.innerHTML) {
      return;
    }
    square.innerHTML = currentPlayer;

    board[i] = currentPlayer;

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (checkWin()) {
      console.log("this runs");
      title.innerHTML = `${currentPlayer} Wins!`;
      gameOver = true;
      return;
    }

    if (checkDraw()) {
      title.innerHTML = `It's a Draw!`;
      gameOver = true;
      return;
    }

    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

function checkDraw() {
  for (let i = 0; i < board.length; ++i) {
    if (!board[i]) {
      return false;
    }
  }
  return true;
}

function checkWin() {
  const winningIndices = [
    // Horizontal Wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical Wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal Wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningIndices.length; ++i) {
    const matchingIndicies = winningIndices[i];
    console.log(matchingIndicies);
    let symbol1 = board[matchingIndicies[0]];
    let symbol2 = board[matchingIndicies[1]];
    let symbol3 = board[matchingIndicies[2]];

    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    if (symbol1 === symbol2 && symbol2 === symbol3) {
      console.log("winner", matchingIndicies);
      return true;
    }
  }
}
