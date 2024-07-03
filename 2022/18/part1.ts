import * as fs from 'fs';

const input = fs.readFileSync("input", "utf8").split('\n').map((line: string) => {
	const [x, y, z] = line.split(',').map(n => +n);
	return { x, y, z };
});

const getKey = (p) => `${p.x},${p.y},${p.z}`;

const checkExists = (point) => set.has(getKey(point));

const getNeighbors = ({ x, y, z }) => [
	{ x: x - 1, y, z },
	{ x: x + 1, y, z },
	{ x, y: y - 1, z },
	{ x, y: y + 1, z },
	{ x, y, z: z - 1 },
	{ x, y, z: z + 1 },
];

const set = new Set(input.map(getKey));

let count = 0;
for (const cube of input) {
	const neighbors = getNeighbors(cube).filter(p => !checkExists(p));
	count += neighbors.length;
}

console.log(count);