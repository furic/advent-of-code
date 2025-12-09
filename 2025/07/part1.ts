import * as fs from 'fs';

const map = fs.readFileSync('input', 'utf8').split('\n');

// Find starting position
const startRow = map.findIndex((line) => line.includes('S'));
const startCol = map[startRow].indexOf('S');

let splits = 0;
let currentBeams = new Map([[startCol, 1]]); // Map of x-position -> beam count

// Process each row from start to end
for (let row = startRow; row < map.length; row++) {
	const nextBeams = new Map<number, number>();

	// Process each beam at current row
	for (const [x, count] of currentBeams) {
		const cell = map[row][x];

		if (cell === '.') {
			// Empty space - beam continues straight
			nextBeams.set(x, (nextBeams.get(x) || 0) + count);
		} else {
			// Obstacle - beam splits left and right
			nextBeams.set(x - 1, (nextBeams.get(x - 1) || 0) + count);
			nextBeams.set(x + 1, (nextBeams.get(x + 1) || 0) + count);
			splits++;
		}
	}

	currentBeams = nextBeams;
}

console.log(splits);
