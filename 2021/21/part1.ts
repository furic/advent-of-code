import * as fs from 'fs';

const positions = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => Number(line.split(': ')[1]));

let points = [0, 0];
let rollCount = 0;
let player = 0;

while (points[0] < 1000 && points[1] < 1000) {
	const firstPoint = (rollCount + 1) % 100;
	positions[player] += (3 * (firstPoint + 1)) % 10;
	if (positions[player] > 10) positions[player] -= 10;
	points[player] += positions[player];
	player = (player + 1) % 2;
	rollCount += 3;
}

console.log(Math.min(...points) * rollCount);
