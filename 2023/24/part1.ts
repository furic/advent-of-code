import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(' @ ').map((x) => x.split(', ').map(Number).slice(0, -1)));

let result = 0;

for (let i = 0; i < input.length; i++) {
	for (let j = i + 1; j < input.length; j++) {
		const [h1, h2] = [input[i], input[j]];
		const denominator = h1[1][0] * h2[1][1] - h2[1][0] * h1[1][1];
		if (denominator === 0) continue;

		const factor1 =
			h1[0][0] * (h1[0][1] + h1[1][1] * 1e14) - h1[0][1] * (h1[0][0] + h1[1][0] * 1e14);
		const factor2 =
			h2[0][0] * (h2[0][1] + h2[1][1] * 1e14) - h2[0][1] * (h2[0][0] + h2[1][0] * 1e14);

		const x = (factor2 * h1[1][0] - factor1 * h2[1][0]) / denominator / 1e14;
		const y = (factor2 * h1[1][1] - factor1 * h2[1][1]) / denominator / 1e14;

		if (
			x >= 2e14 &&
			x <= 4e14 &&
			y >= 2e14 &&
			y <= 4e14 &&
			(x - h1[0][0]) / h1[1][0] >= 0 &&
			(x - h2[0][0]) / h2[1][0] >= 0
		) {
			result++;
		}
	}
}

console.log(result);
