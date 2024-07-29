import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const y = 2000000;
const options = new Set();

for (const line of input) {
	const [, sx, sy, bx, by] = line
		.match(/^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/)
		.map((x) => Number(x));
	const distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
	for (let x = sx - distance; x <= sx + distance; x++) {
		if (bx === x && by === y) {
			continue;
		}
		options.add(x);
	}
}

console.log(options.size);
