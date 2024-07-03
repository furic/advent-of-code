import * as fs from 'fs';

const input = fs.readFileSync("input", "utf8").split("\n");

let sum = 0;

for (const line of input) {
		let numbers = line.replace(/[^0-9]/g, '');
		numbers = numbers[0] + numbers[numbers.length - 1];
		sum += Number(numbers);
}

console.log(sum);