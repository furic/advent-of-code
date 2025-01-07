import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split(',').map(Number);
const min = Math.min(...input);
const max = Math.max(...input);

const distances = [];
for (let i = min; i <= max; i++) {
	distances.push(
		input.reduce((prev, x) => {
			const diff = Math.abs(x - i);
			return prev + (diff * (diff + 1)) / 2;
		}, 0),
	);
}

const result = Math.min(...distances);

console.log(result);
