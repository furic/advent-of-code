import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map((line => line.split('').map(Number)));

const DIRECTIONS = [
	{ dx: -1, dy: 0 }, // left
	{ dx: 1, dy: 0 },  // right
	{ dx: 0, dy: -1 }, // up
	{ dx: 0, dy: 1 }   // down
];

const getIncrementNeighborPositions = (x: number, y: number) =>
	DIRECTIONS.map(({ dx, dy }) => ({ x: x + dx, y: y + dy }))
		.filter(({ x: newX, y: newY }) => input[newY]?.[newX] === input[y][x] + 1);

const getTrailEnds = (x: number, y: number) => {
	if (input[y][x] === 9) return new Set([`${x},${y}`]);
	const incrementNeighborPositions = getIncrementNeighborPositions(x, y);
	if (incrementNeighborPositions.length > 0) {
		return incrementNeighborPositions.reduce((acc, pos) => new Set([...acc, ...getTrailEnds(pos.x, pos.y)]), new Set());
	}
	return new Set();
}

let result = 0;
for (let x = 0; x < input.length; x++) {
	for (let y = 0; y < input[x].length; y++) {
		if (input[y][x] === 0) {
			result += getTrailEnds(x, y).size;
		}
	}
}

console.log(result);