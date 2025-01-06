import * as fs from 'fs';

const [polymer, inserts] = fs.readFileSync('input', 'utf8').split('\n\n');
const insertsMap = Object.fromEntries(inserts.split('\n').map(line => line.split(' -> ')));

const REPEATS = 40;

let pairsMap = new Map<string, number>();
for (let i = 0; i < polymer.length - 1; i++) {
	let key = polymer[i] + polymer[i + 1];
	pairsMap.set(key, (pairsMap.get(key) || 0) + 1);
}

for (let i = 0; i < REPEATS; i++) {
	let newPairsMap = new Map<string, number>();
	for (const [key, count] of pairsMap.entries()) {
		let insert = insertsMap[key];
		newPairsMap.set(key[0] + insert, (newPairsMap.get(key[0] + insert) || 0) + count);
		newPairsMap.set(insert + key[1], (newPairsMap.get(insert + key[1]) || 0) + count);
	}
	pairsMap = newPairsMap;
}

let charsMap = { [polymer[0]]: 1, [polymer.at(-1)]: 1 };
for (const [key, count] of pairsMap.entries()) {
	charsMap[key[0]] = (charsMap[key[0]] || 0) + count;
	charsMap[key[1]] = (charsMap[key[1]] || 0) + count;
}

let max = Math.max(...Object.values(charsMap));
let min = Math.min(...Object.values(charsMap));
const result = (max - min) / 2;

console.log(result);
