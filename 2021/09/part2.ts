import * as fs from 'fs';
import { getNeighbors, getNeighborPositions } from '../../utils';

const input = fs.readFileSync('input', 'utf8').split('\n').map(x => x.split('').map(Number));

const getAllNeighborPositions = (positionSet: Set<string>, x: number, y: number) => {
	const positionKey = `${x},${y}`;
	if (input[x][y] === 9 || positionSet.has(positionKey)) {
		return;
	}
	positionSet.add(positionKey);
	getNeighborPositions(input, x, y).map((p) => getAllNeighborPositions(positionSet, p.x, p.y));
	return positionSet;
}

let basins = [];

for (let x = 0; x < input.length; x++) {
	for (let y = 0; y < input[x].length; y++) {
		const neighbors = getNeighbors(input, x, y);
		const highNeighbors = neighbors.filter((n) => n > input[x][y]);
		if (highNeighbors.length === neighbors.length) {
			const positionSet: Set<string> = new Set();
			basins.push(getAllNeighborPositions(positionSet, x, y).size);
		}
	}
}

console.log(basins.sort((a, b) => b - a).slice(0, 3).reduce((prev, size) => prev * size, 1));
