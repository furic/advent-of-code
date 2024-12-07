import * as fs from 'fs';

const input: string[][] = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((x) => x.split(''));

const rows: number = input.length;
const columns: number = input[0].length;
const invalidDirections: string[] = ['^v', 'v^', '<>', '><'];
const interactions: Record<string, Record<string, number>> = {};

const findIntersections = async (row: number, col: number, direction: string, steps: number, origin: string): Promise<void> => {
	const tileKey: string = [row, col].join(',');
	if (row === rows - 1 && col === columns - 2) {
		interactions[tileKey] ??= {};
		interactions[tileKey][origin] = steps;
		return;
	}

	const neighbors: [number, number, string][] = [];
	if (input[row - 1][col] !== '#' && !invalidDirections.includes(direction + '^')) {
		neighbors.push([row - 1, col, '^']);
	}
	if (input[row + 1][col] !== '#' && !invalidDirections.includes(direction + 'v')) {
		neighbors.push([row + 1, col, 'v']);
	}
	if (input[row][col - 1] !== '#' && !invalidDirections.includes(direction + '<')) {
		neighbors.push([row, col - 1, '<']);
	}
	if (input[row][col + 1] !== '#' && !invalidDirections.includes(direction + '>')) {
		neighbors.push([row, col + 1, '>']);
	}
	if (neighbors.length === 1) {
		await findIntersections(...neighbors[0], steps + 1, origin);
		return;
	}

	let isTileKeyChecked: boolean = tileKey in interactions;
	interactions[tileKey] ??= {};
	interactions[tileKey][origin] = steps;
	if (!isTileKeyChecked) {
		for (const neighbor of neighbors) {
			await findIntersections(...neighbor, 1, tileKey);
		}
	}
};

let result: number = 0;

const walk = async (row: number, col: number, steps: number): Promise<void> => {
	const stack: [number, number, number, Set<string>][] = [[row, col, steps, new Set()]];
	while (stack.length > 0) {
		const [currentRow, currentCol, currentSteps, visited] = stack.pop()!;
		if (currentRow === rows - 1 && currentCol === columns - 2) {
			result = Math.max(result, currentSteps);
			continue;
		}
		const tileKey: string = [currentRow, currentCol].join(',');
		visited.add(tileKey);
		for (const nextTileKey of Object.keys(interactions[tileKey])) {
			if (visited.has(nextTileKey)) {
				continue;
			}
			const nextTile = nextTileKey.split(',').map(Number);
			stack.push([
				nextTile[0],
				nextTile[1],
				currentSteps + interactions[tileKey][nextTileKey],
				new Set(visited),
			]);
		}
	}
};

// First, find all intersections and their connections
(async () => {
	await findIntersections(1, 1, 'v', 1, '0,1');

	for (const k of Object.keys(interactions)) {
		for (const kv of Object.keys(interactions[k])) {
			interactions[kv] ??= {};
			interactions[kv][k] = interactions[k][kv];
		}
	}

	await walk(0, 1, 0);

	console.log(result);
})();