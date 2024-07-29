import * as fs from 'fs';
const input = fs.readFileSync('input', 'utf8').split('\n');

const moves = input[0].replace(/L/g, '0').replace(/R/g, '1').split('');
const nodes = {};
const currents = [];
for (const line of input.slice(2)) {
	const values = line.split(' = ');
	nodes[values[0]] = values[1].replace('(', '').replace(')', '').split(', ');
	if (values[0].endsWith('A')) currents.push(values[0]);
}

// Brute-force method - takes forever to run
// let result = 0;
// loop1:
// while (true) {
//		 result++;
//		 for (const move of moves) {
//				 let success = true;
//				 currents.forEach((value, index) => {
//						 currents[index] = nodes[value][move];
//						 if (!currents[index].endsWith("Z")) success = false;
//				 });
//				 if (success) break loop1;
//		 }
// }
// console.log(result);

const results = Array(currents.length).fill(0);

for (let i = 0; i < currents.length; i++) {
	while (!currents[i].endsWith('Z')) {
		for (const move of moves) {
			currents[i] = nodes[currents[i]][move];
			results[i]++;
			if (currents[i].endsWith('Z')) break;
		}
	}
}

function lcm(...numbers) {
	return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

function gcd(...numbers) {
	return numbers.reduce((a, b) => {
		while (b) {
			const t = b;
			b = a % b;
			a = t;
		}
		return a;
	});
}

console.log(lcm(...results));
