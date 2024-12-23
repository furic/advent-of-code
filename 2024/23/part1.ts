import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const pairMap = new Map<string, string[]>();
input.forEach((line) => {
	const [c1, c2] = line.split('-');
	pairMap.set(c1, [...pairMap.get(c1) ?? [], c2]);
	pairMap.set(c2, [...pairMap.get(c2) ?? [], c1]);
});

const pairedSet = new Set<string>();
let result = 0;

for (const c1 of pairMap.keys()) {
	if (c1.startsWith('t')) {
		const connections = pairMap.get(c1);
		for (let i = 0; i < connections.length; i++) {
			const c2 = connections[i];
			for (let j = i + 1; j < connections.length; j++) {
				const c3 = connections[j];
				if (pairMap.get(c2)!.includes(c3)) {
					const pairKey = [c1, c2, c3].sort().join(',');
					if (!pairedSet.has(pairKey)) {
						result++;
						pairedSet.add(pairKey);
					}
				}
			}
		}
	}
}

console.log(result);