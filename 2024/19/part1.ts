import * as fs from 'fs';

const [towelsRaw, patternsRaw] = fs.readFileSync('input', 'utf8').split('\n\n');
const towels = new Set(towelsRaw.split(', '));
const patterns = patternsRaw.split('\n');

let impossibles = new Set<string>();

const isPossible = (pattern: string) => {
	if (towels.has(pattern)) return true;
	if (impossibles.has(pattern) || pattern.length === 1) return false;
	for (let i = 1; i < pattern.length; i++) {
		if (isPossible(pattern.slice(0, i)) && isPossible(pattern.slice(i))) {
			return true;
		}
	}
	impossibles.add(pattern);
	return false;
};

const result = patterns.reduce((acc, pattern) => acc + Number(isPossible(pattern)), 0);

console.log(result);
