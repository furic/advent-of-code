import * as fs from 'fs';
const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((x) => x.split(''));

const rows = input.length;
const columns = input[0].length;
const shifts = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
];
const startingRow = input.findIndex((x) => x.includes('S'));
const start = [startingRow, input[startingRow].indexOf('S')];

const value = 26501365 % input.length;
const seen = [];

for (let i = 0; i < 3; i++) {
	const queue = [start];
	for (let j = 0; j < value + rows * i; j++) {
		const prevQueue = [...queue];
		// const queueSet = new Set();
		const queueSet = new Set(queue.map((x) => x.join(',')));
		queue.length = 0;

		while (prevQueue.length > 0) {
			const pos = prevQueue.shift();

			for (const shift of shifts) {
				const row = pos[0] + shift[0];
				const column = pos[1] + shift[1];
				const nextPos = [row, column];
				if (
					!queueSet.has(nextPos.join(',')) &&
					input[((row % rows) + rows) % rows][((column % columns) + columns) % columns] !== '#'
				) {
					queueSet.add(nextPos.join(','));
					queue.push(nextPos);
				}
			}
		}
	}

	seen.push(queue.length);
}

// https://github.com/villuna/aoc23/wiki/A-Geometric-solution-to-advent-of-code-2023,-day-21
// https://www.reddit.com/r/adventofcode/comments/18ofc8i/2023_day_21_part_2_intuition_behind_solution/
// Our input is 131x131 tiles in size, and 26501365 = 65 + (202300 * 131). 65 is the number of steps it takes to get from the centre of the square to the edge, and 131 is the number of steps it takes to traverse the whole square.
// There are (n + 1) odd squares, and n evensquares. What these corners "represent" is all the tiles that are at a distance of >65 steps away from the centre of the input-square (recall that 65 is the distance from the centre to the edge of an input-square).

const a = Math.floor((seen[2] - seen[1] * 2 + seen[0]) / 2);
const b = seen[1] - seen[0] - 3 * a;
const c = seen[0] - a - b;
const x = Math.ceil(26501365 / input.length);

console.log(a * x ** 2 + b * x + c);
