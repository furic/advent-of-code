import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map((line => line.split('')));

const directions = [
	{ x: -1, y: 0, name: 'left' },
	{ x: 0, y: 1, name: 'down' },
	{ x: 1, y: 0, name: 'right' },
	{ x: 0, y: -1, name: 'up' },
];

const getArea = (x: number, y: number, area: Set<string>) => {
	const key = `${x},${y}`;
	if (!area.has(key)) {
		area.add(key);
		for (const direction of directions) {
			if (input[y][x] === input[y + direction.y]?.[x + direction.x]) {
				getArea(x + direction.x, y + direction.y, area);
			}
		}
	}
};

const getFences = (key: string, fences: Set<string>) => {
	const [x, y] = key.split(',').map(Number);
	for (const direction of directions) {
		if (input[y][x] === input[y + direction.y]?.[x + direction.x]) {
			continue;
		}
		fences.add(`${direction.name},${x},${y}`);
	}
}

const getSideCount = (directionName: string, fences: Set<string>) => {
	const fenceKeys = Array.from(fences).filter((fenceKey) => fenceKey.startsWith(directionName));
	const fenceMap = new Map<number, number[]>();
	for (const fenceKey of fenceKeys) {
		const [_, x, y] = fenceKey.split(',').map(Number);
		if (directionName === 'left' || directionName === 'right') {
			fenceMap.set(x, [...(fenceMap.get(x) || []), y]);
		} else {
			fenceMap.set(y, [...(fenceMap.get(y) || []), x]);
		}
	}
	let count = 0;
	for (const positions of fenceMap.values()) {
		const sortedPositions = positions.sort((a, b) => a - b);
		count += sortedPositions.filter((v, i) => i === 0 || v - sortedPositions[i - 1] > 1).length;
	}
	return count;
}

let result = 0;
let visited = new Set<string>();

for (let y = 0; y < input.length; y++) {
	for (let x = 0; x < input[y].length; x++) {
		const key = `${x},${y}`;
		if (!visited.has(key)) {
			const area = new Set<string>();
			getArea(x, y, area);
			visited = new Set([...visited, ...area]);

			const fences = new Set<string>();
			Array.from(area).map((plot) => getFences(plot, fences));

			for (const direction of directions) {
				result += area.size * getSideCount(direction.name, fences);
			}
		}
	}
}

console.log(result);
