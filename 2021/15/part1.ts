import * as fs from 'fs';
import type { PathFindingPoint } from '../../types';
import { findPathScore } from '../../utils';

const input = fs.readFileSync('input', 'utf8').split('\n');

const board: PathFindingPoint[][] = input.map((line, row) =>
	line.split('').map((cell, column) => ({ x: column, y: row, score: Number(cell) })));

const result = findPathScore(
	board,
	board[0][0],
	(current) => current.x === board[0].length - 1 && current.y === board.length - 1
);

console.log(result - board[0][0].score);
