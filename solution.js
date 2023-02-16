// STEP 1. When we click on a game square, show if its an X or 0
// 'X' if it was player 1 and '0' if it was player 2
// Update the h1 to say whose turn it is

// STEP. 2 Determine when the game ends
// When you click on a square, check to see the game ended (win or draw)
// Update the text when the game ends

// STEP 3. Restart the game
// When you click the restart game button, reset the board

// -----------------------------------------------------------------------

// Imports the buttons to use from HTML
const allSquares = document.querySelectorAll(".board__square");

// Imports the title to use from HTML
const title = document.querySelector(".board__title");

// Global variable to assign a player
let currentPlayer = "X";

let board = new Array(9);

// Global variable to stop the game
let gameOver = false;

// Best Practice to button loop
allSquares.forEach((square, i) => {
  // Access the square and access the eventListener
  square.addEventListener("click", () => {
    // Stops the other player clicking their square & Stops players clicking a square when the game is OVER
    if (square.innerHTML || gameOver) {
      return;
    }

    // Prints the global variable of "X" on the browser HTML
    square.innerHTML = currentPlayer;

    // Setting the element at a certain array depending on what Array[i] you click on
    board[i] = currentPlayer;

    console.log(board);

    // After we switch the square but before we let the next player take their turn we want to check if we win --- STEP 2.
    if (checkWin()) {
      console.log("this runs");
      // Dynamically shows who wins
      title.innerHTML = `${currentPlayer} Wins!`;
      // Stops the game if someone wins
      gameOver = true;
      // This return stops the game from continuing onto the next persons turn
      return;
    }

    if (checkDraw()) {
      // Displays the Title at the top and stops the game
      console.log("its a draw");
      title.innerHTML = `Its a Draw!`;
      gameOver = true;
      return;
    }

    // Ternary operator that allows each player to take a turn in order
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Makes the title dynamic to which player's turn it is
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

function checkDraw() {
  // Return false if the loop through the board DID NOT see any empty elements
  for (i = 0; i < board.length; ++i) {
    if (!board[i]) {
      return false;
    }
  }
  // Otherwise return true
  return true;
}

// Horizontal Winners
// If Index of 0 = Index of 1 = Index of 2 ---> Game Over
// If Index of 3 = Index of 4 = Index of 5 ---> Game Over
// If Index of 6 = Index of 7 = Index of 8 ---> Game Over

// Vertical Winners
// If Index of 0 = Index of 3 = Index of 6 ---> Game Over
// If Index of 1 = Index of 4 = Index of 7 ---> Game Over
// If Index of 2 = Index of 5 = Index of 8 ---> Game Over

// Diagonal Winners
// If Index of 0 = Index of 4 = Index of 8 ---> Game Over
// If Index of 2 = Index of 4 = Index of 6 ---> Game Over

function checkWin() {
  const winningIndicies = [
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

  // Loops over the arrays
  for (let i = 0; i < winningIndicies.length; ++i) {
    const matchingIndicies = winningIndicies[i];
    console.log(matchingIndicies);
    // We are looking at the board at index [0]
    let symbol1 = board[matchingIndicies[0]];
    // We are looking at the board at index [1]
    let symbol2 = board[matchingIndicies[1]];
    // We are looking at the board at index [2]
    let symbol3 = board[matchingIndicies[2]];

    // This makes sure the three horizontal are not empty and we can keep playing
    // Make sure this is above the code below so it checks if they are empty before making them equal each other
    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }

    // If symbol2 is equal to symbol3 --> By default symbol1 = symbol3
    if (symbol1 === symbol2 && symbol2 === symbol3) {
      console.log("winner at", matchingIndicies);
      // Allows checkWin() to return true
      return true;
    }
  }
}

function restartGame() {
  // We need to reset the title + Clear out the board + Reset the board to a fresh new Array
  // 1. Reset the Title
  title.innerHTML = `${currentPlayer}'s Turn`;

  // 2. Reset the DOM
  allSquares.forEach((square) => {
    square.innerHTML = "";
  });

  // Reset the board
  gameOver = false;

  board = new Array(9);
}
