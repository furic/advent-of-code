import * as fs from 'fs';

type Valve = {
	id: string;
	rate: number;
	destinations: string[];
	paths: Path[];
};
type Path = { id: string; distance: number };

const input = fs.readFileSync('input', 'utf8').split('\n');

const getDistance = (valves: Record<string, Valve>, from: string, to: string) => {
	const queue = [{ id: from, steps: 0 }];
	const visited = new Set(`${from},0`);
	while (queue.length > 0) {
		const current = queue.shift();
		if (current.id === to) {
			return current.steps;
		}
		const neighbors = valves[current.id].destinations
			.map((id) => ({ id, steps: current.steps + 1 }))
			.filter((x) => !visited.has(`${x.id},${x.steps}`));
		neighbors.forEach((x) => visited.add(`${x.id},${x.steps}`));
		queue.push(...neighbors);
	}
};

const valves: Record<string, Valve> = input
	.map((line) => {
		const [, id, rate, destinations] = line.match(
			/^Valve ([^\s]+) has flow rate=(\d+); tunnels? leads? to valves? (.+)$/,
		);
		return { id, rate: +rate, destinations: destinations.split(', ') } as Valve;
	})
	.reduce((obj, valve) => ({ ...obj, [valve.id]: valve }), {});

Object.values(valves).forEach((valve) => {
	valve.paths = Object.values(valves)
		.filter(({ id, rate }) => id !== valve.id && rate > 0)
		.map(({ id }) => ({ id, distance: getDistance(valves, valve.id, id) }) as Path);
});

const findBest = (
	valves: Record<string, Valve>,
	current: string,
	open: Set<string>,
	time: number,
) => {
	if (time === 0) {
		return 0;
	}
	const results = valves[current].paths
		.filter(({ id, distance }) => !open.has(id) && time > distance)
		.map(({ id, distance }) => {
			const remaining = time - distance - 1;
			const pressure = valves[id].rate * remaining;
			return pressure + findBest(valves, id, new Set(open).add(id), remaining);
		});
	return Math.max(0, ...results);
};

let result = findBest(valves, 'AA', new Set(), 30);

console.log(result);
