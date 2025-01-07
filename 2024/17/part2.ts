import * as fs from 'fs';

let [a, b, c, ...program] = fs.readFileSync('input', 'utf8').match(/\d+/g).map(Number);

const run = () => {
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
	return output;
};

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

The output does not depend on the intermediate values of B and C.
After shifting A (A = A >> 3), the process can be repeated the process until a condition is met.

In each iteration, A can be represented as A = 8 * (NextA) + [0..8], and so forth.
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
