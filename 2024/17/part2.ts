import * as fs from 'fs';

let [a, b, c, ...program] = fs.readFileSync('input', 'utf8').match(/\d+/g).map(Number);

const run = () => {
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
				b = combo & 7;
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
	return output;
}

/* 
Reverse engineer the output calculation:
1. B = A % 8
2. B = B ^ 2
3. C = A >> B
4. B = B ^ C
5. A = A >> 3
6. B = B ^ 7
7. Output B

The output can be expressed as:
output(((A % 8) ^ 2) ^ (A >> ((A % 8) ^ 2)) ^ 7)

After shifting A:
A = A >> 3
Repeat the process until a condition is met.

Function to calculate output based on A:
getOutput(A):
    partial = (A % 8) ^ 2
    return ((partial ^ (A >> partial)) ^ 7) % 8
*/
const findA0 = (nextVal = 0, i = program.length - 1) => {
	if (i < 0) return nextVal;
	for (let aVal = nextVal * 8; aVal < nextVal * 8 + 8; aVal++) {
		a = aVal;
		const output = run();
		if (output[0] === program[i]) {
			const finalVal = findA0(aVal, i - 1);
			if (finalVal >= 0) return finalVal;
		}
	}
	return -1;
};

console.log(findA0());
