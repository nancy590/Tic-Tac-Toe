const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];


function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'winning');
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    isXTurn = true;
    gameActive = true;
    status.textContent = "Player X's turn";
}

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

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass.toUpperCase();
}


function swapTurns() {
    isXTurn = !isXTurn;
    status.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

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

function highlightWinningCombination(currentClass) {
    winningCombinations.forEach(combination => {
        if (combination.every(index => cells[index].classList.contains(currentClass))) {
            combination.forEach(index => {
                cells[index].classList.add('winning');
            });
        }
    });
}

restartButton.addEventListener('click', startGame);

startGame();