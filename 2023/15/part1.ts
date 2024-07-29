import * as fs from 'fs';
const input = fs.readFileSync('input', 'utf8').split(',');

let result = 0;

for (const str of input) {
	result += str
		.split('')
		.map((x) => x.charCodeAt(0))
		.reduce((a, x) => (17 * (a + x)) % 256, 0);
}

console.log(result);
