const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Initialize the game
function startGame() {
    cells.forEach(cell => {
        // Clear all classes
        cell.classList.remove('x', 'o', 'winning');
        // Clear the text content
        cell.textContent = '';
        // Remove and re-add click event listener
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    isXTurn = true;
    gameActive = true;
    status.textContent = "Player X's turn";
}

// Handle cell click
function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) return;

    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

// Place X or O in the cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}

// Switch turns
function swapTurns() {
    isXTurn = !isXTurn;
    status.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
}

// Check for win
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

// Check for draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

// End the game
function endGame(draw) {
    gameActive = false;
    if (draw) {
        status.textContent = "Game ended in a draw!";
    } else {
        const winner = isXTurn ? 'X' : 'O';
        status.textContent = `Player ${winner} wins!`;
        highlightWinningCombination(winner.toLowerCase());
    }
}

// Highlight winning combination
function highlightWinningCombination(currentClass) {
    winningCombinations.forEach(combination => {
        if (combination.every(index => cells[index].classList.contains(currentClass))) {
            combination.forEach(index => {
                cells[index].classList.add('winning');
            });
        }
    });
}

// Restart game
restartButton.addEventListener('click', startGame);

// Start the game
startGame();