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
		for (const from of points) {
			if (origin !== from) {
				const dx = origin.x - from.x;
				const dy = origin.y - from.y;
				if (input[origin.y + dy]?.[origin.x + dx]) {
					antinodes.add(`${origin.x + dx},${origin.y + dy}`);
				}
			}
		}
	}
}

console.log(antinodes.size);
