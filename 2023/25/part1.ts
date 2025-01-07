import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');
const components: Record<string, string[]> = {};
const betweenness: Record<string, number> = {};

input.forEach((line) => {
	const [component1, connected] = line.split(': ');
	const component2s = connected.split(' ');
	component2s.forEach((component2) => {
		components[component1] ??= [];
		components[component1].push(component2);
		components[component2] ??= [];
		components[component2].push(component1);
	});
});

Object.keys(components).forEach((component) => {
	const visited = new Set<string>();
	const queue: [string, string[]][] = [[component, []]];
	while (queue.length) {
		const [current, path] = queue.shift()!;
		path.forEach((connection) => {
			betweenness[connection] = (betweenness[connection] || 0) + 1;
		});
		components[current].forEach((next) => {
			if (!visited.has(next)) {
				visited.add(next);
				queue.push([next, [...path, [current, next].sort().join(',')]]);
			}
		});
	}
});

const importantConnections = Object.keys(betweenness)
	.sort((a, b) => betweenness[b] - betweenness[a])
	.slice(0, 3)
	.map((x) => x.split(','));

importantConnections.forEach((connection) => {
	const [comp1, comp2] = connection;
	components[comp1]?.splice(components[comp1].indexOf(comp2), 1);
	if (!components[comp1]?.length) delete components[comp1];
	components[comp2]?.splice(components[comp2].indexOf(comp1), 1);
	if (!components[comp2]?.length) delete components[comp2];
});

const lastComponent = Object.keys(components).pop();
if (lastComponent) {
	const visited = new Set<string>([lastComponent]);
	const queue = [lastComponent];
	while (queue.length > 0) {
		const current = queue.pop()!;
		for (const next of components[current] || []) {
			if (!visited.has(next)) {
				visited.add(next);
				queue.push(next);
			}
		}
	}
	console.log(visited.size * (Object.keys(components).length - visited.size));
}
