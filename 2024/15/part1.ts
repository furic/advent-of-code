import * as fs from 'fs';

const [mapRaw, directionsRaw] = fs.readFileSync('input', 'utf8').split('\n\n');
const map = mapRaw.split('\n').map((line) => line.split(''));
const directions = directionsRaw.replace(/\n/g, '').split('');

const y = map.findIndex(line => line.includes('@'));
const x = map[y].indexOf('@');
const position = { x: x, y: y };

const offsets = {
	'<': { x: -1, y: 0 },
	'v': { x: 0, y: 1 },
	'>': { x: 1, y: 0 },
	'^': { x: 0, y: -1 },
};

const move = (x: number, y: number, offset: { x: number, y: number }) => {
	switch (map[y + offset.y][x + offset.x]) {
		case '.':
			map[y + offset.y][x + offset.x] = map[y][x];
			map[y][x] = '.';
			return true;
		case '#':
			return false;
		default:
			if (move(x + offset.x, y + offset.y, offset)) {
				move(x, y, offset);
				return true;
			}
			return false;
	}
}

directions.forEach((direction) => {
	const offset = offsets[direction];
	if (move(position.x, position.y, offset)) {
		position.x += offset.x;
		position.y += offset.y;
	}
});

let result = map.reduce((acc, row, y) =>
	acc + row.reduce((rowAcc, cell, x) =>
		cell === 'O' ? rowAcc + (100 * y + x) : rowAcc, 0), 0);

console.log(result);
