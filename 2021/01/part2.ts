import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map(Number);

const windows = [];

for (let i = 0; i < input.length - 2; i++) {
	windows.push(input[i] + input[i + 1] + input[i + 2]);
}

let result = 0;

for (let i = 1; i < windows.length; i++) {
	result += windows[i] > windows[i - 1] ? 1 : 0;
}

console.log(result);
