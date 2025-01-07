import * as fs from 'fs';
import { getNeighbors } from '../../utils';

const input = fs.readFileSync('input', 'utf8').split('\n');

const shortcutRequired = 100;

let start = { x: 0, y: 0, isWall: false };
let end = { x: 0, y: 0, isWall: false };
let originalTime = undefined;

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

const race = (maze: { x: number; y: number; isWall: boolean }[][]) => {
	const queue = [{ x: start.x, y: start.y, steps: 0 }];
	const visited = new Map();
	visited.set(`${start.x},${start.y}`, 0);

	let time = Infinity;

	while (queue.length > 0) {
		const current = queue.shift();
		if (current.x === end.x && current.y === end.y) {
			time = Math.min(current.steps, time);
			continue;
		}

		const neighbors = getNeighbors(maze, current).filter((cell) => cell && !cell.isWall);

		let searches = neighbors
			.map((neighbor) => ({
				x: neighbor.x,
				y: neighbor.y,
				steps: current.steps + 1,
			}))
			.filter((search) => {
				const key = `${search.x},${search.y}`;
				if (originalTime && search.steps > originalTime - shortcutRequired) {
					return false;
				}
				return !visited.has(key) || visited.get(key) > search.steps;
			});

		queue.push(...searches);
		searches.forEach((search) => visited.set(`${search.x},${search.y}`, search.steps));
	}

	return time;
};

originalTime = race(maze);

let result = 0;

for (let x = 1; x < maze[0].length - 1; x++) {
	for (let y = 1; y < maze.length - 1; y++) {
		if (maze[y][x].isWall) {
			const neighbors = getNeighbors(maze, x, y).filter((cell) => cell && !cell.isWall);

			if (
				neighbors.length === 2 &&
				(Math.abs(neighbors[0].x - neighbors[1].x) === 2 ||
					Math.abs(neighbors[0].y - neighbors[1].y) === 2)
			) {
				// Only remove walls connecting 2 track grids in two opposite direction
				const mazeClone = maze.map((row) => row.map((grid) => ({ ...grid })));
				mazeClone[y][x].isWall = false;
				const time = race(mazeClone);
				if (originalTime - time >= shortcutRequired) result++;
			}
		}
	}
}

console.log(result);
