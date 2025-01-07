import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8');

const results = Array.from(input.matchAll(/mul\((\d+),(\d+)\)/g)).map(
	(match) => Number(match[1]) * Number(match[2]),
);

const answer = results.reduce((a, b) => a + b, 0);

console.log(answer);
