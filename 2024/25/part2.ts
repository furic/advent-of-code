import * as fs from 'fs';

const [, gatesString] = fs.readFileSync('input', 'utf8').split('\n\n');

const gates = gatesString.split('\n');

const find = (input1: string, input2: string, operate: string) => {
	const gate = gates.find(
		(gate) =>
			gate.startsWith(`${input1} ${operate} ${input2}`) ||
			gate.startsWith(`${input2} ${operate} ${input1}`),
	);
	return gate?.split(' -> ').pop();
};

// Binary Half Adder
// https://www.electronics-lab.com/article/binary-adder/
// X1 XOR Y1 => M1
// X1 AND Y1 => N1
// C0 AND M1 => R1
// C0 XOR M1 -> Z1
// R1 OR N1 -> C1

let swapped: string[] = [];
let c0: string | undefined = undefined;

for (let i = 0; i < 45; i++) {
	let n = i.toString().padStart(2, '0');
	let m1 = find(`x${n}`, `y${n}`, 'XOR'); // Sum
	let n1 = find(`x${n}`, `y${n}`, 'AND'); // Carry
	let r1: string, z1: string, c1: string;

	if (c0) {
		r1 = find(c0, m1, 'AND'); // Calculate carry with previous carry
		if (!r1) {
			[n1, m1] = [m1, n1]; // Swap if no carry found
			swapped.push(m1, n1);
			r1 = find(c0, m1, 'AND');
		}

		z1 = find(c0, m1, 'XOR'); // Calculate new sum with carry
		if (m1?.startsWith('z')) {
			[m1, z1] = [z1, m1];
			swapped.push(m1, z1);
		}
		if (n1?.startsWith('z')) {
			[n1, z1] = [z1, n1];
			swapped.push(n1, z1);
		}
		if (r1?.startsWith('z')) {
			[r1, z1] = [z1, r1];
			swapped.push(r1, z1);
		}

		c1 = find(r1, n1, 'OR'); // Final carry for the next bit
		if (c1?.startsWith('z') && c1 !== 'z45') {
			[c1, z1] = [z1, c1]; // Swap if carry starts with 'z'
			swapped.push(c1, z1);
		}
	}
	c0 = c1 || n1;
}

console.log(swapped.sort().join(','));
