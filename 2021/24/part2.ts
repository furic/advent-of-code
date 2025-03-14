import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

/*
Reversed Engineering
The input was a set of 18 instructions for each digit of the model number. 
The instruction sets could be split into two types. 
The first type always contained div z 1 and add x n (n>=10), this set would cause z to become bigger. 
The second type always contained div z 26 and add x n (n ≤ 0), this set would cause z to get smaller 
if the addition action would result in a number between 1 and 9. 
Inputs to the second type of instruction set could therefore be filtered out based on this knowledge.
Full explanation: https://github.com/romellem/advent-of-code/pull/181
*/

let result = new Array(14).fill(1);
let stack = [];
let push = false;

input.forEach((line, i) => {
	let value = Number(line.split(' ').pop());
	let mnIndex = Math.floor(i / 18); // Model number index
	let iIndex = Math.floor(i % 18); // Instruction index

	if (iIndex === 4) {
		push = value === 1;
	}
	if (push && iIndex === 15) {
		stack.push({ index: mnIndex, diff: value });
	}
	if (!push && iIndex === 5) {
		let { prevMnIndex, diff } = stack.pop();
		diff += value;
		if (result[prevMnIndex] + diff > 0 && result[prevMnIndex] + diff < 10) {
			result[mnIndex] = result[prevMnIndex] + diff;
		} else {
			result[prevMnIndex] = result[mnIndex] - diff;
		}
	}
});

console.log(Number(result.join('')));
