import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

let result = [];
let current = 0;

for (const line of input) {
	if (line == '') {
		result.push(current);
		current = 0;
	} else {
		current += Number(line);
	}
}

console.log(
	result
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((a, b) => a + b, 0),
);
