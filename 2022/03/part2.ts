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

for (let i = 0; i < input.length; i += 3) {
	for (var j = 0; j < input[i].length; j++) {
		let item = input[i][j];
		if (input[i + 1].includes(item) && input[i + 2].includes(item)) {
			result += getPriority(item);
			break;
		}
	}
}

console.log(result);
