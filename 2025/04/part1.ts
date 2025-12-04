import * as fs from 'fs';
import { getEightNeighbors } from '../../utils';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(''));

let result = 0;

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[0].length; j++) {
		if (input[i][j] !== '@') continue;
		const count = getEightNeighbors(input, j, i).filter((x) => x === '@').length;
		if (count < 4) {
			result++;
		}
	}
}

console.log(result);
