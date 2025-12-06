import * as fs from 'fs';

const lines = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((x) => x.trim().split(/\s+/));

let sum = 0;
const ops = lines[lines.length - 1];

for (let i = 0; i < lines[0].length; i++) {
	let result = ops[i] === '+' ? 0 : 1;
	for (let x = 0; x < lines.length - 1; x++) {
		if (ops[i] === '+') result += +lines[x][i];
		else result *= +lines[x][i];
	}
	sum += result;
}

console.log(sum);
