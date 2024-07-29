import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const getPriority = (item: string): number => {
	var priority = parseInt(item, 36) - 9;
	if (/^[A-Z]*$/.test(item)) {
		priority += 26;
	}
	return priority;
};

let result = 0;

for (const line of input) {
	var firstPart = line.substring(0, line.length / 2);
	var secondPart = line.substring(line.length / 2);
	var item = firstPart.split('').find((x) => secondPart.includes(x));
	if (item) {
		result += getPriority(item);
	}
}

console.log(result);
