import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(''));

const antennas = new Map<string, { x: number; y: number }[]>();
input.forEach((row, y) => {
	row.forEach((cell, x) => {
		if (cell !== '.') {
			antennas.set(cell, (antennas.get(cell) || []).concat({ x, y }));
		}
	});
});

const antinodes = new Set<string>();

for (const points of antennas.values()) {
	for (const origin of points) {
		for (const to of points) {
			if (origin !== to) {
				let x = origin.x;
				let y = origin.y;
				const dx = to.x - origin.x;
				const dy = to.y - origin.y;
				while (input[y + dy]?.[x + dx]) {
					x += dx;
					y += dy;
					antinodes.add(`${x},${y}`);
				}
			}
		}
	}
}

console.log(antinodes.size);
