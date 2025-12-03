import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((x) => {
		let [, direction, count] = x.match(/(L|R)(\d+)/);
		return { direction: direction === 'L' ? -1 : 1, count: +count };
	});

let result = 0;
input.reduce((prev, curr) => {
	let next = (prev + curr.direction * curr.count) % 100;
	if (next < 0) next += 100;
	if (next === 0) result++;
	return next;
}, 50);

console.log(result);
