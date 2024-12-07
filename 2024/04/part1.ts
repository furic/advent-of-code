import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map((line => line.split('')));

const search = 'XMAS';
const directions = [
	{ x: -1, y: 0 },
	{ x: -1, y: 1 },
	{ x: 0, y: 1 },
	{ x: 1, y: 1 },
	{ x: 1, y: 0 },
	{ x: 1, y: -1 },
	{ x: 0, y: -1 },
	{ x: -1, y: -1 }
];

let result = 0;

const findNext = (i: number, j: number, index: number, direction: { x: number, y: number }): boolean => {
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
		for (const direction of directions) {
			findNext(i, j, 0, direction);
		}
	}
}

console.log(result);
