import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(' ').map(Number));

const isSafe = (levels: number[]) => {
	const steps = levels.slice(1).map((level, i) => level - levels[i]);
	const isIncreasing = steps.every((step) => step >= 1 && step <= 3);
	const isDecreasing = steps.every((step) => step >= -3 && step <= -1);
	return isIncreasing || isDecreasing;
};

const result = input.filter(isSafe).length;

console.log(result);
