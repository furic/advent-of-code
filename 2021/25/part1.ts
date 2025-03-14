import * as fs from 'fs';
import { Point } from '../../types';

let east: Point[] = [];
let south: Point[] = [];
let blocked: Set<string> = new Set();

const sea = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line, y) => line.split(''));

sea.map((line, y) =>
	line.map((char, x) => {
		if (char === '>') east.push({ x, y });
		if (char === 'v') south.push({ x, y });
	}),
);

let result = 0;
let solved = true;

const snapshotBlocked = () => {
	blocked.clear();
	[...east, ...south].forEach((point) => blocked.add(`${point.x},${point.y}`));
};

const move = (points: Point[], dx: number, dy: number) => {
	points.forEach((point) => {
		let x = (point.x + dx) % sea[0].length;
		let y = (point.y + dy) % sea.length;
		const key = `${x},${y}`;
		if (!blocked.has(key)) {
			point.x = x;
			point.y = y;
			solved = false;
		}
	});
	snapshotBlocked();
};

snapshotBlocked();

do {
	result++;
	solved = true;
	move(east, 1, 0);
	move(south, 0, 1);
} while (!solved);

console.log(result);
