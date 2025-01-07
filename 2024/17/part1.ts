import * as fs from 'fs';

let [a, b, c, ...program] = fs.readFileSync('input', 'utf8').match(/\d+/g).map(Number);

let output: number[] = [];
for (let i = 0; i < program.length; i += 2) {
	const instruction = program[i];
	const literal = program[i + 1];
	const combo = literal >= 4 ? [a, b, c][literal - 4] : literal;
	[
		() => (a = Math.floor(a / (1 << combo))),
		() => (b = b ^ literal),
		() => (b = combo & 7),
		() => (i = a !== 0 ? (i = literal - 2) : i),
		() => (b = b ^ c),
		() => output.push(combo & 7),
		() => (b = Math.floor(a / (1 << combo))),
		() => (c = Math.floor(a / (1 << combo))),
	][instruction]();
}

console.log(output.join(','));
