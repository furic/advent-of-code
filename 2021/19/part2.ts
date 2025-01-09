import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.replaceAll(/^--.*\n/gm, '')
	.split('\n\n');

const scanners = input.map((lines) => lines.split('\n').map((c) => c.split(',').map(Number)));

const rotate = ([x, y, z]: number[], orientation: number) =>
	[
		[x, y, z],
		[x, z, -y],
		[x, -y, -z],
		[x, -z, y],
		[y, x, -z],
		[y, z, x],
		[y, -x, z],
		[y, -z, -x],
		[z, x, y],
		[z, y, -x],
		[z, -x, -y],
		[z, -y, x],
		[-x, y, -z],
		[-x, z, y],
		[-x, -y, z],
		[-x, -z, -y],
		[-y, x, z],
		[-y, z, -x],
		[-y, -x, -z],
		[-y, -z, x],
		[-z, x, -y],
		[-z, y, x],
		[-z, -x, y],
		[-z, -y, -x],
	][orientation];

const match = (scanner1: number[][], scanner2: number[][]) => {
	for (let index = 0; index < 24; index++) {
		let offsets = {};
		let rotatedScanner2 = scanner2.map((x) => rotate(x, index));
		for (let p1 of scanner1) {
			for (let p2 of rotatedScanner2) {
				let offset = p1.map((value, index) => value - p2[index]);
				let key = JSON.stringify(offset);
				offsets[key] = (offsets[key] || 0) + 1;
				if (offsets[key] >= 12) {
					let offsetBeacons = rotatedScanner2.map((points) =>
						points.map((value, index) => value + offset[index]),
					);
					return { offset, beacons: offsetBeacons };
				}
			}
		}
	}
};

let skip = [];
let offsetScanners = [{ offset: [0, 0, 0], beacons: scanners.shift() }];

while (scanners.length > 0) {
	for (let a of offsetScanners) {
		for (let b of scanners) {
			if (skip.find((x) => x.a === a && x.b === b)) continue;
			let offsetBeacons = match(a.beacons, b);
			if (offsetBeacons) {
				scanners.splice(scanners.indexOf(b), 1);
				offsetScanners.push(offsetBeacons);
			} else {
				skip.push({ a, b });
			}
		}
	}
}

let result = 0;

for (let { offset: a } of offsetScanners) {
	for (let { offset: b } of offsetScanners) {
		result = Math.max(result, a.reduce((sum, x, i) => sum + Math.abs(x - b[i]), 0));
	}
}

console.log(result);
