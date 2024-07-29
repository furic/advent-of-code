import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((x) => x.split(',').map((y) => y.split('-').map((z) => Number(z))));

let result = 0;

for (const sections of input) {
	if (sections[0][0] >= sections[1][0] && sections[0][1] <= sections[1][1]) {
		result++;
	} else if (sections[1][0] >= sections[0][0] && sections[1][1] <= sections[0][1]) {
		result++;
	}
}

console.log(result);
