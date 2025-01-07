import * as fs from 'fs';

const [towelsRaw, patternsRaw] = fs.readFileSync('input', 'utf8').split('\n\n');
const towels = new Set(towelsRaw.split(', '));
const patterns = patternsRaw.split('\n');

let possibleCountMap = new Map<string, number>();

const getPossibleCount = (pattern: string) => {
	if (possibleCountMap.has(pattern)) return possibleCountMap.get(pattern);
	if (pattern.length === 0) return 1;

	let count = 0;
	for (let tower of towels) {
		if (pattern.startsWith(tower)) count += getPossibleCount(pattern.slice(tower.length));
	}

	possibleCountMap.set(pattern, count);
	return count;
};

const count = patterns.reduce((acc, pattern) => acc + getPossibleCount(pattern), 0);

console.log(count);
