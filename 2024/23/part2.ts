import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

let connections = input.map((line) => line.split('-'));

const pairMap = new Map<string, string[]>();
connections.forEach((connection) => {
	const [c1, c2] = connection;
	pairMap.set(c1, [...pairMap.get(c1) ?? [], c2]);
	pairMap.set(c2, [...pairMap.get(c2) ?? [], c1]);
});

const mergeConnection = (connections: string[][]) => {
	// Flatten the connections to find all computers connected to each computer in the group
	let groups = connections.flatMap(computers => {
		let connectedComputers = computers.map(c => pairMap.get(c));
		// Identify all computers that are interconnected within the group
		let addedComputers = connectedComputers.reduce((a, b) => a.filter(value => b.includes(value)));
		// Create new groups by adding the interconnected computers to the existing group
		return [...addedComputers].map(addition => [...computers, addition]);
	});
	// Generate unique group keys by sorting and joining the computer names
	const groupKeys = groups.map(group => group.sort().join(","));
	// Return unique groups as arrays of computer names
	return [...new Set(groupKeys)].map(groupKey => groupKey.split(","));
}

while (connections.length > 1) {
	connections = mergeConnection(connections);
}

console.log(connections[0].sort().join(","));