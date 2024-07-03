import * as fs from 'fs';

const input = fs.readFileSync("input", "utf8").split("\n");

const size = 4000000;
const options = new Set();

const sensors = input.map(line => {
		const [, sx, sy, bx, by] = line.match(
				/^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/,
		).map((x) => Number(x));
		return { sx, sy, bx, by };
});

let result = 0;

for (let y = 0; y <= size; y++) {
		let ranges = [];
		for (const { sx, sy, bx, by } of sensors) {
			const distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
			if (distance >= 0) {
				ranges.push([sx - distance, sx + distance]);
			}
		}
		ranges = ranges.sort((a, b) => a[0] - b[0]);

		let guess = 0;
		for (const range of ranges) {
			if (guess >= range[0] && guess <= range[1]) {
				guess = range[1] + 1;
			}
		}
		if (guess <= size) {
				result = guess * 4000000 + y;
				break;
		}
}

console.log(result);