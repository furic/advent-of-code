import * as fs from 'fs';
import type { PathFindingPoint } from '../../types';
import { findPathScore } from '../../utils';

const input = fs.readFileSync('input', 'utf8').split('\n');

let board: PathFindingPoint[][] = input.map((line, row) =>
	line.split('').map((cell, column) => ({ x: column, y: row, score: Number(cell) })));

const inc = (row: PathFindingPoint[], i: number, columnCount = -1) =>
	row.map(p => ({
		x: columnCount === -1 ? p.x + row.length * i : p.x,
		y: columnCount !== -1 ? columnCount * i + p.y : p.y,
		score: p.score + i > 9 ? p.score + i - 9 : p.score + i
	}));
board = board.map(row => row.concat(inc(row, 1), inc(row, 2), inc(row, 3), inc(row, 4)));
const dup = (board: PathFindingPoint[][], i: number) => board.map(row => inc(row, i, board.length));
board = board.concat(dup(board, 1), dup(board, 2), dup(board, 3), dup(board, 4));

const result = findPathScore(
	board,
	board[0][0],
	(current) => current.x === board[0].length - 1 && current.y === board.length - 1
);

console.log(result - board[0][0].score);
