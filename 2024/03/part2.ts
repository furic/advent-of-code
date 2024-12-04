import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8');

const commands = Array.from(input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g));

let enabled = true;
let result = commands.reduce((acc, command) => {
	if (command[0] === "do()") {
		enabled = true;
	} else if (command[0] === "don't()") {
		enabled = false;
	} else if (enabled) {
		const [, a, b] = command;
		return acc + (Number(a) * Number(b));
	}
	return acc;
}, 0);

console.log(result);
