import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split('').map(Number));
const batteries = 12;

let voltages = input.map((line) => {
	let result = 0;
	line.push(0);
	for (let i = batteries; i > 0; i--) {
		let max = Math.max(...line.slice(0, -1 * i));
		let index = line.findIndex((x) => x === max);
		line = line.slice(index + 1);
		result = result * 10 + max;
	}
	return result;
});

const result = voltages.reduce((a, b) => a + b);

console.log(result);
