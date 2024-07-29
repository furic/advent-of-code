import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n\n')
	.map((x) => x.split('\n').map((y) => JSON.parse(y)));

const check = (a, b) => {
	for (let i = 0; i < a.length && i < b.length; i++) {
		if (Number.isInteger(a[i]) && Number.isInteger(b[i])) {
			if (a[i] !== b[i]) {
				return a[i] - b[i];
			}
		} else {
			const result = check(
				Number.isInteger(a[i]) ? [a[i]] : a[i],
				Number.isInteger(b[i]) ? [b[i]] : b[i],
			);
			if (result !== 0) {
				return result;
			}
		}
	}
	return a.length - b.length;
};

const result = input
	.map((pair, i) => (check(pair[0], pair[1]) < 0 ? i + 1 : 0))
	.reduce((a, b) => a + b);

console.log(result);
