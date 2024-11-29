import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map(x => x.split('').map(Number));

const DIRECTIONS = [
	{ dx: -1, dy: 0 }, // left
	{ dx: 1, dy: 0 },  // right
	{ dx: 0, dy: -1 }, // up
	{ dx: 0, dy: 1 }   // down
];

const getNeighbors = (x: number, y: number) =>
	DIRECTIONS.map(({ dx, dy }) => input[x + dx]?.[y + dy])
		.filter(n => n !== undefined);

const getNeighborPositions = (x: number, y: number) =>
	DIRECTIONS.map(({ dx, dy }) => input[x + dx]?.[y + dy] ? { x: x + dx, y: y + dy } : undefined)
		.filter(p => p);

const getAllNeighborPositions = (positionSet: Set<string>, x: number, y: number) => {
	const positionKey = `${x},${y}`;
	if (input[x][y] === 9 || positionSet.has(positionKey)) {
		return;
	}
	positionSet.add(positionKey);
	getNeighborPositions(x, y).map((p) => getAllNeighborPositions(positionSet, p.x, p.y));
	return positionSet;
}

let basins = [];

for (let x = 0; x < input.length; x++) {
	for (let y = 0; y < input[x].length; y++) {
		const neighbors = getNeighbors(x, y);
		const highNeighbors = neighbors.filter((n) => n > input[x][y]);
		if (highNeighbors.length === neighbors.length) {
			const positionSet: Set<string> = new Set();
			basins.push(getAllNeighborPositions(positionSet, x, y).size);
		}
	}
}

console.log(basins.sort((a, b) => b - a).slice(0, 3).reduce((prev, size) => prev * size, 1));
