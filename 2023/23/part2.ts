import * as fs from 'fs';
const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((x) => x.split(''));
// const input = fs.readFileSync("example", "utf8").split("\n").map(x => x.split(""));

const rows = input.length;
const columns = input[0].length;
const invalidDirections = ['^v', 'v^', '<>', '><'];
const interactions = {};

const findIntersections = async (row, col, direction, steps, origin) => {
	const tileKey = [row, col].join(',');
	if (row === rows - 1 && col === columns - 2) {
		// endpoint
		interactions[tileKey] ??= {};
		interactions[tileKey][origin] = steps;
		return;
	}

	const neighbors = [];
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
		await findIntersections(...neighbors[0], steps + 1, original);
		return;
	}

	let isTileKeyChecked = tileKey in interactions;
	interactions[tileKey] ??= {};
	interactions[tileKey][origin] = steps;
	if (!isTileKeyChecked) {
		for (const neighbor of neighbors) {
			await findIntersections(...neighbor, 1, tileKey);
		}
	}
};

let result = 0;

const walk = async (row, col, steps, visited) => {
	if (row === rows - 1 && col === columns - 2) {
		// endpoint
		result = Math.max(result, steps);
		return;
	}
	const tileKey = [row, col].join(',');
	visited.add(tileKey);
	for (const nextTileKey of Object.keys(interactions[tileKey])) {
		if (visited.has(nextTileKey)) {
			continue;
		}
		await walk(
			...nextTileKey.split(',').map(Number),
			steps + interactions[tileKey][nextTileKey],
			new Set(visited),
		);
	}
};

// `Maximum call stack size exceeded` occurs if using the solution in part.1 w/o `invalidDirections`
// first, find all intersections and their connections first
// then, try all the combination from intersections to intersections, till reaching the endpoint
// use await and async to avoid stack size exceeded
(async () => {
	await findIntersections(1, 1, 'v', 1, '0,1');

	for (const k of Object.keys(interactions)) {
		for (const kv of Object.keys(interactions[k])) {
			interactions[kv] ??= {};
			interactions[kv][k] = interactions[k][kv];
		}
	}

	await walk(0, 1, 0, new Set());

	console.log(result);
})();
