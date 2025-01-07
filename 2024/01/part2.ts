import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(/\s+/).map(Number));

const frequencyMap = new Map<number, number>();

input.forEach(([, b]) => {
	frequencyMap.set(b, (frequencyMap.get(b) || 0) + 1);
});

const result = input.reduce((sum, [x]) => sum + x * (frequencyMap.get(x) || 0), 0);

console.log(result);
