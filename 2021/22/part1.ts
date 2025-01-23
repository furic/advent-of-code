import * as fs from 'fs';

const commands = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => {
		const [operation, coordinate] = line.split(' ');
		const [x, y, z] = coordinate.split(',').map((axis) => axis.slice(2).split('..').map(Number));
		return [x, y, z].some(([min, max]) => min < -50 || max > 50) ? null : { op: operation === 'on', x, y, z };
	})
	.filter(Boolean);

const onCubes = new Set<string>();
commands.forEach(({ op, x, y, z }) => {
	for (let i = x[0]; i <= x[1]; i++) {
		for (let j = y[0]; j <= y[1]; j++) {
			for (let k = z[0]; k <= z[1]; k++) {
				const key = `${i},${j},${k}`;
				op ? onCubes.add(key) : onCubes.delete(key);
			}
		}
	}
});

console.log(onCubes.size);
