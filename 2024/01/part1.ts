import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n')
	.map(line => line.split(/\s+/).map(Number));

const left = input.map(pair => pair[0]).sort((a, b) => a - b);
const right = input.map(pair => pair[1]).sort((a, b) => a - b);

const result = left.reduce((sum, x, i) => sum + Math.abs(x - right[i]), 0);

console.log(result);
