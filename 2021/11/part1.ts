import * as fs from 'fs';
import { EIGHT_WAY_DIRECTIONS } from '../../constants';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((x) => x.split('').map(Number));

const increment = (x: number, y: number) => {
	if (input[y]?.[x] !== undefined) {
		input[y][x]++;
		if (input[y][x] === 10) {
			EIGHT_WAY_DIRECTIONS.forEach((direction) => increment(x + direction.x, y + direction.y));
		}
	}
};

let result = 0;

for (let n = 0; n < 100; n++) {
	input.forEach((row, y) => row.forEach((_, x) => increment(x, y)));
	input.forEach((row, y) =>
		row.forEach((value, x) => {
			if (value > 9) {
				result++;
				input[y][x] = 0;
			}
		}),
	);
}

console.log(result);
