import * as fs from 'fs';

const [rawNumbers, ...rawBoards] = fs.readFileSync('input', 'utf8').split('\n\n');

type Slot = { marked: boolean; number: number };

const numbers = rawNumbers.split(',').map((n) => Number(n));
let boards = rawBoards.map((board) =>
	board.split('\n').map((row) =>
		row
			.trim()
			.split(/\s+/)
			.map((n) => ({ marked: false, number: Number(n) }) as Slot),
	),
);

const mark = (board: Slot[][], number: number) => {
	board.forEach((row) => row.forEach((slot) => slot.number === number && (slot.marked = true)));
};

const checkWin = (board: Slot[][]) => {
	const winnerRow = board.some((row) => row.every((slot) => slot.marked));
	const winnerCol = board[0].some((s, i) => board.every((row) => row[i].marked));
	return winnerRow || winnerCol;
};

const calcScore = (board: Slot[][]) => {
	let sum = 0;
	board.forEach((row) => row.forEach((slot) => !slot.marked && (sum += slot.number)));
	return sum;
};

const solve = () => {
	for (const number of numbers) {
		for (const board of boards) {
			mark(board, number);
			if (checkWin(board)) {
				if (boards.length === 1) {
					return number * calcScore(board);
				} else {
					boards = boards.filter((b) => b !== board);
				}
			}
		}
	}
};

const result = solve();

console.log(result);
