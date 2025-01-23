import * as fs from 'fs';

const commands = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => {
		const [operation, coordinate] = line.split(' ');
		const [x, y, z] = coordinate.split(',').map((axis) => axis.slice(2).split('..').map(Number));
		return {
			op: operation === 'on',
			x: [x[0], x[1] + 1] as Range,
			y: [y[0], y[1] + 1] as Range,
			z: [z[0], z[1] + 1] as Range,
		};
	})
	.filter(Boolean);

type Range = [number, number];
type Cuboid = { x: Range; y: Range; z: Range };

const overlaps = (a: Cuboid, b: Cuboid) =>
	a.x[0] < b.x[1] &&
	a.x[1] > b.x[0] &&
	a.y[0] < b.y[1] &&
	a.y[1] > b.y[0] &&
	a.z[0] < b.z[1] &&
	a.z[1] > b.z[0];

const splitSections = (range1: Range, range2: Range) => [
	range1[0],
	...range2.filter((x) => x > range1[0] && x < range1[1]),
	range1[1],
];

const subtract = (a: Cuboid, b: Cuboid) => {
	const xSections = splitSections(a.x, b.x);
	const ySections = splitSections(a.y, b.y);
	const zSections = splitSections(a.z, b.z);

	return xSections
		.slice(0, -1)
		.flatMap((x, i) =>
			ySections.slice(0, -1).flatMap((y, j) =>
				zSections.slice(0, -1).map((z, k) => ({
					x: [x, xSections[i + 1]] as Range,
					y: [y, ySections[j + 1]] as Range,
					z: [z, zSections[k + 1]] as Range,
				})),
			),
		)
		.filter((cuboid) => !overlaps(cuboid, b));
};

let sections: Cuboid[] = [];
for (const command of commands) {
	sections = sections.flatMap((section) =>
		overlaps(section, command) ? subtract(section, command) : [section],
	);
	if (command.op) sections.push(command);
}

const result = sections.reduce(
	(sum, { x, y, z }) => sum + (x[1] - x[0]) * (y[1] - y[0]) * (z[1] - z[0]),
	0,
);

console.log(result);
