import * as fs from 'fs';
import { ORTHOGONAL_DIRECTIONS } from '../../constants';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(''));

const getArea = (x: number, y: number, area: Set<string>) => {
	const key = `${x},${y}`;
	if (!area.has(key)) {
		area.add(key);
		for (const direction of ORTHOGONAL_DIRECTIONS) {
			if (input[y][x] === input[y + direction.y]?.[x + direction.x]) {
				getArea(x + direction.x, y + direction.y, area);
			}
		}
	}
};

const getFenceCount = (key: string) => {
	const [x, y] = key.split(',').map(Number);
	let count = 4;
	for (const direction of ORTHOGONAL_DIRECTIONS) {
		if (input[y][x] === input[y + direction.y]?.[x + direction.x]) {
			count--;
		}
	}
	return count;
};

let result = 0;
let visited = new Set<string>();

for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		const key = `${x},${y}`;
		if (!visited.has(key)) {
			const area = new Set<string>();
			getArea(x, y, area);
			visited = new Set([...visited, ...area]);
			const fenceCount = Array.from(area).reduce((acc, plot) => acc + getFenceCount(plot), 0);
			result += area.size * fenceCount;
		}
	}
}

console.log(result);
