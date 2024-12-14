import * as fs from 'fs';

const robots = fs.readFileSync('input', 'utf8').split('\n').map(line => {
	const [, px, py, vx, vy] = line.match(/p=(.+),(.+) v=(.+),(.+)/);
	return { position: { x: Number(px), y: Number(py) }, velocity: { x: Number(vx), y: Number(vy) } };
});

const WIDTH = 101;
const HEIGHT = 103;

for (let i = 1; i <= 100; i++) {
	robots.forEach(robot => {
		robot.position = {
			x: (WIDTH + robot.position.x + robot.velocity.x) % WIDTH,
			y: (HEIGHT + robot.position.y + robot.velocity.y) % HEIGHT,
		}
	});
}

let counts = [0, 0, 0, 0];
const MID_WIDTH = (WIDTH - 1) / 2;
const MID_HEIGHT = (HEIGHT - 1) / 2;

robots.forEach(robot =>
	robot.position.x !== MID_WIDTH &&
	robot.position.y !== MID_HEIGHT &&
	counts[Number(robot.position.x > MID_WIDTH) + 2 * Number(robot.position.y > MID_HEIGHT)]++
);

const result = counts.reduce((a, b) => a * b, 1);

console.log(result);
