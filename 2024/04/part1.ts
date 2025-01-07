import * as fs from 'fs';
import type { Point } from '../../types';
import { EIGHT_WAY_DIRECTIONS } from '../../constants';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(''));

const search = 'XMAS';

let result = 0;

const findNext = (i: number, j: number, index: number, direction: Point): boolean => {
	if (input[i]?.[j] !== search[index]) {
		return;
	}
	if (index === search.length - 1) {
		result++;
		return;
	}
	findNext(i + direction.x, j + direction.y, index + 1, direction);
};

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[i].length; j++) {
		for (const direction of EIGHT_WAY_DIRECTIONS) {
			findNext(i, j, 0, direction);
		}
	}
}

console.log(result);
