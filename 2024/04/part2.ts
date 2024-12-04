import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map((row => row.split('')));

const search = 'A';
const matches = ['MS', 'SM'];
const directionPairs = [
	[{ x: -1, y: 1 }, { x: 1, y: -1 }],
	[{ x: 1, y: 1 }, { x: -1, y: -1 }]
];

let result = 0;

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[i].length; j++) {
		if (input[i][j] === search) {
			let matched = 0;
			for (const directionPair of directionPairs) {
				const directionPairString = directionPair.reduce((acc, direction) =>
					acc + input[i + direction.x]?.[j + direction.y], '');
				if (matches.includes(directionPairString)) {
					matched++;
				}
			}
			if (matched === directionPairs.length) {
				result++;
			}
		}
	}
}

console.log(result);
