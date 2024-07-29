import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const findMostCommonBit = (index: number): string => {
	const counter = input.filter((number) => number[index] === '1').length;
	return counter >= input.length / 2 ? '1' : '0';
};

let mostCommonBits = '';
for (let index = 0; index < input[0].length; index++) {
	mostCommonBits += findMostCommonBit(index);
}

const mostCommonValue = parseInt(mostCommonBits, 2);
const mask = parseInt('1'.repeat(input[0].length), 2);
const leastCommonValue = ~mostCommonValue & mask;

console.log(mostCommonValue * leastCommonValue);
