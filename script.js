'use strict';

const game = document.querySelector('.game');
const cells = document.querySelectorAll('.cell');
const reset = document.querySelector('.reset');
const statusDisplay = document.querySelector('.game--status');
const winningCases = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 4, 8],
	[2, 4, 6],
	[2, 5, 8],
	[0, 3, 6],
	[1, 4, 7],
];

let gameInProgress = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '❌';

const winningMessage = () => `PLAYER ${currentPlayer} WON!🏆`;
const drawMessage = () => `THE GAME ENDED IN A DRAW!❌⭕`;
const turn = () => `IT'S ${currentPlayer}'S TURN!`;

const handleCell = function (cell, index) {
	gameState[index] = currentPlayer;
	cell.textContent = currentPlayer;
};

const handleResult = function () {
	let win = false;

	for (let i = 0; i <= 7; i++) {
		let winningState = winningCases[i];
		let a = gameState[winningState[0]];
		let b = gameState[winningState[1]];
		let c = gameState[winningState[2]];

		if (a === '' || b === '' || c === '') {
			continue;
		}
		if (a === b && b === c) {
			win = true;
			break;
		}
	}
	if (win) {
		statusDisplay.textContent = winningMessage();
		gameInProgress = false;
		return;
	}
	let draw = !gameState.includes('');
	if (draw) {
		statusDisplay.textContent = drawMessage();
		gameInProgress = false;
		return;
	}

	changeTurn();
};

const handleCellClick = function (click) {
	const cell = click.target;
	const cellIndex = parseInt(cell.getAttribute('data-cell'));

	if (gameState[cellIndex] !== '' || !gameInProgress) return;

	handleCell(cell, cellIndex);
	handleResult();
};

const changeTurn = () => {
	currentPlayer = currentPlayer === '❌' ? '⭕' : '❌';
	statusDisplay.textContent = turn();
};

const restart = function () {
	gameInProgress = true;
	gameState = ['', '', '', '', '', '', '', '', ''];
	currentPlayer = '❌';
	statusDisplay.textContent = turn();
	cells.forEach(cell => (cell.textContent = ''));
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
reset.addEventListener('click', restart);
