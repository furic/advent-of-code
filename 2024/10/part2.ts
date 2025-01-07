import * as fs from 'fs';
import { getNeighborPositions } from '../../utils';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split('').map(Number));

const getIncrementNeighborPositions = (x: number, y: number) =>
	getNeighborPositions(input, x, y).filter(
		(neighborPosition) => input[neighborPosition.y][neighborPosition.x] === input[y][x] + 1,
	);

const getTrailCount = (x: number, y: number) => {
	if (input[y][x] === 9) return 1;
	const incrementNeighborPositions = getIncrementNeighborPositions(x, y);
	if (incrementNeighborPositions.length > 0) {
		return incrementNeighborPositions.reduce((acc, pos) => acc + getTrailCount(pos.x, pos.y), 0);
	}
	return 0;
};

let result = 0;
for (let x = 0; x < input.length; x++) {
	for (let y = 0; y < input[x].length; y++) {
		if (input[y][x] === 0) {
			result += getTrailCount(x, y);
		}
	}
}

console.log(result);
