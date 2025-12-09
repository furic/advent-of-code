import * as fs from 'fs';

type Junction = {
	x: number;
	y: number;
	z: number;
	circuit: symbol | null;
};

type Pair = {
	a: Junction;
	b: Junction;
	dist: number;
};

const junctions: Junction[] = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => {
		const [x, y, z] = line.split(',').map(Number);
		return { x, y, z, circuit: null };
	});

const pairs: Pair[] = [];
for (let i = 0; i < junctions.length; i++) {
	for (let j = i + 1; j < junctions.length; j++) {
		const a = junctions[i];
		const b = junctions[j];
		const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
		pairs.push({ a, b, dist });
	}
}

pairs.sort((p1, p2) => p1.dist - p2.dist);

let allConnected = false;
let pair: Pair;

do {
	pair = pairs.shift();
	const a = pair.a;
	const b = pair.b;

	if (a.circuit === null && b.circuit === null) {
		const newCircuit = Symbol();
		a.circuit = newCircuit;
		b.circuit = newCircuit;
	} else if (a.circuit === null) {
		a.circuit = b.circuit;
	} else if (b.circuit === null) {
		b.circuit = a.circuit;
	} else if (a.circuit !== b.circuit) {
		const oldCircuit = b.circuit;
		for (const junction of junctions) {
			if (junction.circuit === oldCircuit) {
				junction.circuit = a.circuit;
			}
		}
	}

	let { circuit } = junctions[0];
	allConnected = circuit && junctions.every((junction) => junction.circuit === circuit);
} while (!allConnected);

const result = pair.a.x * pair.b.x;

console.log(result);
