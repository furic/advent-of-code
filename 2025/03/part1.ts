import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split('').map(Number));

let voltages = input.map((line) => {
	let maxVoltage = 0;
	for (let i = 0; i < line.length - 1; i++) {
		for (let j = i + 1; j < line.length; j++) {
			const voltage = line[i] * 10 + line[j];
			maxVoltage = Math.max(maxVoltage, voltage);
		}
	}
	return maxVoltage;
});

const result = voltages.reduce((a, b) => a + b);

console.log(result);
