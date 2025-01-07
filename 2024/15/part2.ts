import * as fs from 'fs';

const [mapRaw, directionsRaw] = fs.readFileSync('input', 'utf8').split('\n\n');
const map = mapRaw
	.split('\n')
	.map((line) =>
		line
			.replaceAll('#', '##')
			.replaceAll('O', '[]')
			.replaceAll('.', '..')
			.replaceAll('@', '@.')
			.split(''),
	);
const directions = directionsRaw.replace(/\n/g, '').split('');

const y = map.findIndex((line) => line.includes('@'));
const x = map[y].indexOf('@');
const position = { x: x, y: y };

const offsets = {
	'<': { x: -1, y: 0 },
	v: { x: 0, y: 1 },
	'>': { x: 1, y: 0 },
	'^': { x: 0, y: -1 },
};

const move = (x: number, y: number, offset: { x: number; y: number }, doMove = true) => {
	const dest = map[y + offset.y][x + offset.x];
	switch (dest) {
		case '.':
			if (doMove) {
				map[y + offset.y][x + offset.x] = map[y][x];
				map[y][x] = '.';
			}
			return true;
		case '#':
			return false;
		default:
			if (offset.y === 0) {
				// Horizontal
				if (move(x + offset.x, y, offset)) {
					move(x, y, offset);
					return true;
				}
			} else {
				// Vertical
				let pairOffsetX = dest === '[' ? 1 : -1;
				if (
					move(x, y + offset.y, offset, false) &&
					move(x + pairOffsetX, y + offset.y, offset, false)
				) {
					if (doMove) {
						move(x, y + offset.y, offset);
						move(x + pairOffsetX, y + offset.y, offset);
						move(x, y, offset);
					}
					return true;
				}
				return false;
			}
	}
};

directions.forEach((direction) => {
	const offset = offsets[direction];
	if (move(position.x, position.y, offset)) {
		position.x += offset.x;
		position.y += offset.y;
	}
});

let result = map.reduce(
	(acc, row, y) =>
		acc + row.reduce((rowAcc, cell, x) => (cell === '[' ? rowAcc + (100 * y + x) : rowAcc), 0),
	0,
);

console.log(result);
