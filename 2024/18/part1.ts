import * as fs from 'fs';
import { getNeighborPositions } from '../../utils';

const input = fs.readFileSync('input', 'utf8').split('\n');

const SIZE = 71;
const BYTE_COUNT = 1024;

const map: string[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill('.'));
input.slice(0, BYTE_COUNT).forEach((line) => {
	const [x, y] = line.split(',').map(Number);
	map[y][x] = '#';
});

const queue = [{ x: 0, y: 0, visited: new Set(['0,0']) }];
const visited = new Map();
visited.set('0,0', 1);

let result = Infinity;

while (queue.length > 0) {
	const current = queue.shift();
	if (current.x === SIZE - 1 && current.y === SIZE - 1) {
		result = Math.min(current.visited.size - 1, result);
		continue;
	}

	const neighborPoints = getNeighborPositions(map, current).filter(
		(point) => map[point.y]?.[point.x] !== '#' && !current.visited.has(`${point.x},${point.y}`),
	);

	let searches = neighborPoints.map((point) => ({
		...point,
		visited: new Set([...current.visited, `${point.x},${point.y}`]),
	}));
	searches = searches.filter((search) => {
		const key = `${search.x},${search.y}`;
		return !visited.has(key) || visited.get(key) > search.visited.size;
	});

	queue.push(...searches);
	searches.forEach((search) => visited.set(`${search.x},${search.y}`, search.visited.size));
}

console.log(result);
