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
	for (let i = 0; i < curr.count; i++) {
		prev += curr.direction;
		if (prev === -1) prev = 99;
		if (prev === 100) prev = 0;
		if (prev === 0) result++;
	}
	return prev;
}, 50);

console.log(result);
