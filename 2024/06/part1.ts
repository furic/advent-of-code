import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(''));

const startY = input.findIndex((line) => line.includes('^'));
const startX = input[startY].indexOf('^');
let current = { x: startX, y: startY, direction: 'up' };

const STEP = {
	up: { x: 0, y: -1, turnDirection: 'right' },
	down: { x: 0, y: 1, turnDirection: 'left' },
	left: { x: -1, y: 0, turnDirection: 'up' },
	right: { x: 1, y: 0, turnDirection: 'down' },
};

input[current.y][current.x] = '.';

const visited = new Set<string>();
while (input[current.y]?.[current.x]) {
	const next = { ...current };
	while (input[next.y]?.[next.x] === '.') {
		visited.add(`${next.x},${next.y}`);
		next.x += STEP[current.direction].x;
		next.y += STEP[current.direction].y;
	}
	if (input[next.y]?.[next.x] === '#') {
		next.x -= STEP[current.direction].x;
		next.y -= STEP[current.direction].y;
		next.direction = STEP[current.direction].turnDirection;
	}
	current = next;
}

console.log(visited.size);
