import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const directions = [
	{ x: 1, y: 0, name: 'east' },
	{ x: 0, y: -1, name: 'south' },
	{ x: -1, y: 0, name: 'west' },
	{ x: 0, y: 1, name: 'north' },
];

let start = { x: 0, y: 0, isWall: false };
let end = { x: 0, y: 0, isWall: false };

const maze = input.map((line, row) =>
	line.split('').map((cell, column) => {
		if (cell === 'S') {
			return (start = { x: column, y: row, isWall: false });
		} else if (cell === 'E') {
			return (end = { x: column, y: row, isWall: false });
		} else {
			return { x: column, y: row, isWall: cell === '#' };
		}
	}),
);

const queue = [
	{
		x: start.x,
		y: start.y,
		directionName: 'east',
		score: 0,
		visited: new Set([`${start.x},${start.y}`]),
	},
];
const visited = new Map();
visited.set(`${start.x},${start.y},east`, 0);

let result = Infinity;

while (queue.length > 0) {
	const current = queue.shift();
	if (current.x === end.x && current.y === end.y) {
		result = Math.min(current.score, result);
		continue;
	}

	const neighbors = directions
		.map((direction) => ({ ...maze[current.y + direction.y][current.x + direction.x], direction }))
		.filter((cell) => cell && !cell.isWall && !current.visited.has(`${cell.x},${cell.y}`));

	let searches = neighbors.map((neighbor) => ({
		x: neighbor.x,
		y: neighbor.y,
		directionName: neighbor.direction.name,
		score: current.score + 1 + (current.directionName === neighbor.direction.name ? 0 : 1000),
		visited: new Set([...current.visited, `${neighbor.x},${neighbor.y}`]),
	}));
	searches = searches.filter((search) => {
		const key = `${search.x},${search.y},${search.directionName}`;
		return !visited.has(key) || visited.get(key) > search.score;
	});

	queue.push(...searches);
	searches.forEach((search) =>
		visited.set(`${search.x},${search.y},${search.directionName}`, search.score),
	);
}

console.log(result);
