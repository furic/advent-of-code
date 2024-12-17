import * as fs from 'fs';

let [a, b, c, ...program] = fs.readFileSync('input', 'utf8').match(/\d+/g).map(Number);

let output: number[] = [];
for (let i = 0; i < program.length; i += 2) {
	const instruction = program[i];
	const literal = program[i + 1];
	const combo = literal >= 4 ? [a, b, c][literal - 4] : literal;

	switch (instruction) {
		case 0:
			a = Math.floor(a / (1 << combo));
			break;
		case 1:
			b = b ^ literal;
			break;
		case 2:
			b = combo % 8;
			break;
		case 3:
			if (a !== 0) {
				i = literal - 2;
			}
			break;
		case 4:
			b = b ^ c;
			break;
		case 5:
			output.push(combo & 7);
			break;
		case 6:
			b = Math.floor(a / (1 << combo));
			break;
		case 7:
			c = Math.floor(a / (1 << combo));
			break;
	}
}

console.log(output.join(','));
