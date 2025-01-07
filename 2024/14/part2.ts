import * as fs from 'fs';

const robots = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => {
		const [, px, py, vx, vy] = line.match(/p=(.+),(.+) v=(.+),(.+)/);
		return {
			position: { x: Number(px), y: Number(py) },
			velocity: { x: Number(vx), y: Number(vy) },
		};
	});

const WIDTH = 101;
const HEIGHT = 103;
const TREE_SEARCH = '#'.repeat(10); // 10 robots in a line is already a weird case that representing a christmas tree

let result = 0;

while (++result) {
	let map = Array.from({ length: HEIGHT }, () => Array(WIDTH).fill('.'));
	robots.forEach((robot) => {
		robot.position = {
			x: (WIDTH + robot.position.x + robot.velocity.x) % WIDTH,
			y: (HEIGHT + robot.position.y + robot.velocity.y) % HEIGHT,
		};
		map[robot.position.y][robot.position.x] = '#';
	});
	if (map.some((row) => row.join('').includes(TREE_SEARCH))) break;
}

console.log(result);
