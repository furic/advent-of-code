import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split(',').map(Number);
const days = 256;

let map = {};
for (let i = 0; i < input.length; i++) {
	map[input[i]] = (map[input[i]] || 0) + 1;
}
for (let i = 0; i < days; i++) {
	const next = {};
	for (const key in map) {
		if (key === '0') {
			next[6] = (next[6] || 0) + map[key];
			next[8] = (next[8] || 0) + map[key];
		} else {
			next[+key - 1] = (next[+key - 1] || 0) + map[key];
		}
	}
	map = next;
}

const result = Object.values(map).reduce((a: number, b: number) => a + b, 0);

console.log(result);
