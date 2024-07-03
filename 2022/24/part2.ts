import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split('\n');

let map = new Map<string, string[]>();
const width = input[0].length;
const height = input.length;
const start = { x: 1, y: 0 };
const end = { x: width - 2, y: height - 1 };
input.forEach((line: string, y: number) => {
	line.split('').forEach((cell: string, x: number) => {
		if (cell !== '.') {
			map.set(`${x},${y}`, (map.get(`${x},${y}`) || []).concat([cell]));
		}
	});
});
map.set(`${start.x},${start.y - 1}`, ['#']);
map.set(`${end.x},${end.y + 1}`, ['#']);

const serialize = (map: Map<string, string[]>) => {
	const serializeKey = (key: string) => `${key}:${map.get(key)?.join('')}`;
	return Array.from(map.keys()).sort().map(serializeKey).join(',');
};

const nextMap = (map: Map<string, string[]>) => {
	const next = new Map();
	for (const key of map.keys()) {
		const cell = map.get(key);
		if (cell) {
			const [x, y] = key.split(',').map(n => Number(n));
			for (const blizzard of cell) {
				let pos = key;
				if (blizzard === '>') pos = `${x === width - 2 ? 1 : x + 1},${y}`;
				if (blizzard === '<') pos = `${x === 1 ? width - 2 : x - 1},${y}`;
				if (blizzard === 'v') pos = `${x},${y === height - 2 ? 1 : y + 1}`;
				if (blizzard === '^') pos = `${x},${y === 1 ? height - 2 : y - 1}`;
				next.set(pos, (next.get(pos) || []).concat([blizzard]));
			}
		}
	}
	return next;
}

const makeTrip = (startPos: { x: number, y: number }, endPos: { x: number, y: number }, steps: number) => {
	let queue = [{ ...startPos, steps }];
	const visited = new Set();
	while (queue.length > 0) {
		const next = queue.shift();
		if (next) {
			if (next.x === endPos.x && next.y === endPos.y) {
				return next.steps;
			}
			for (const pos of getNeighbors(next)) {
				const hash = `${pos.x},${pos.y},${pos.steps % maps.length}`;
				if (!visited.has(hash)) {
					visited.add(hash);
					queue.push(pos);
				}
			}
		}
	}
	return 0;
}

const getNeighbors = ({ x, y, steps }: { x: number, y: number, steps: number }) => {
	const map = maps[(steps + 1) % maps.length];
	return [
		{ x: x - 1, y, steps: steps + 1 },
		{ x: x + 1, y, steps: steps + 1 },
		{ x, y: y - 1, steps: steps + 1 },
		{ x, y: y + 1, steps: steps + 1 },
		{ x, y, steps: steps + 1 },
	].filter(pos => !map.has(`${pos.x},${pos.y}`));
}

const serialized = serialize(map);
const maps: Map<string, string[]>[] = [];
do {
	maps.push(map);
	map = nextMap(map);
} while (serialize(map) !== serialized);

let result = 0;
result = makeTrip(start, end, result);
result = makeTrip(end, start, result);
result = makeTrip(start, end, result);
console.log(result);