import * as fs from 'fs';
import { getNeighbors } from '../../utils';

const input = fs.readFileSync('input', 'utf8').split('\n');

const maxCheatCount = 20;
const shortcutRequired = 100;

let start = { x: 0, y: 0, isWall: false };
let end = { x: 0, y: 0, isWall: false };
let originalTime = undefined;
let originalTrack: { x: number; y: number }[] = [];

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

const race = (
	maze: { x: number; y: number; isWall: boolean }[][],
	start: { x: number; y: number },
	end: { x: number; y: number },
	stopIfOver = undefined,
) => {
	const queue = [{ x: start.x, y: start.y, steps: 0, visited: [start] }];
	const visited = new Map();
	visited.set(`${start.x},${start.y}`, 0);

	let time = Infinity;

	while (queue.length > 0) {
		const current = queue.shift();
		if (current.x === end.x && current.y === end.y) {
			if (!originalTime && current.steps < time) {
				originalTrack = current.visited;
			}
			time = Math.min(current.steps, time);
			continue;
		}

		const neighbors = getNeighbors(maze, current).filter((cell) => cell && !cell.isWall);

		let searches = neighbors
			.map((neighbor) => ({
				x: neighbor.x,
				y: neighbor.y,
				steps: current.steps + 1,
				visited: !originalTime ? [...current.visited, neighbor] : [],
			}))
			.filter((search) => {
				const key = `${search.x},${search.y}`;
				if (stopIfOver && visited > stopIfOver) return false;
				return !visited.has(key) || visited.get(key) > search.steps;
			});

		queue.push(...searches);
		searches.forEach((search) => visited.set(`${search.x},${search.y}`, search.steps));
	}

	return time;
};

originalTime = race(maze, start, end);

let result = 0;

originalTrack.forEach((cheatStart, startIndex) => {
	const visited = originalTrack.slice(0, startIndex);
	const mazeClone = maze.map((row) => row.map((grid) => ({ ...grid })));
	visited.forEach((pos) => (mazeClone[pos.y][pos.x].isWall = true));

	originalTrack.forEach((cheatEnd, endIndex) => {
		if (endIndex <= startIndex) return;

		const cheatCount = Math.abs(cheatStart.x - cheatEnd.x) + Math.abs(cheatStart.y - cheatEnd.y);
		if (cheatCount <= 1 || cheatCount > maxCheatCount) return;

		if (originalTrack[startIndex + cheatCount] === cheatEnd)
			// Ignore cheat that's already on track
			return;

		const time = startIndex + cheatCount + (originalTime - endIndex);

		if (originalTime - time >= shortcutRequired) {
			result++;
		}
	});
});

console.log(result);
