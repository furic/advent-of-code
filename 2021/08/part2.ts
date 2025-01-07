import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((x) => x.split(' | '));
const lines = input.map((l) => l.map((d) => d.split(' ').map((d) => d.split('').sort().join(''))));

const result = lines.reduce((prev, [patterns, output]) => {
	const isLength = (n: number) => (d: string) => d.length === n;
	const hasDigit = (p: string, n: number) => (d: string) =>
		p.split('').filter((c) => d.includes(c)).length === n;

	const d1 = patterns.find(isLength(2));
	const d4 = patterns.find(isLength(4));
	const d7 = patterns.find(isLength(3));
	const d8 = patterns.find(isLength(7));

	const d069 = patterns.filter(isLength(6));
	const d6 = d069.find(hasDigit(d1, 1));
	const d9 = d069.find(hasDigit(d4, 4));
	const d0 = d069.find((d) => d !== d6 && d !== d9);

	const d235 = patterns.filter(isLength(5));
	const d5 = d235.find(hasDigit(d6, 5));
	const d2 = d235.find(hasDigit(d9, 4));
	const d3 = d235.find((d) => d !== d2 && d !== d5);

	const map = [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9];
	return Number(output.map((d) => map.indexOf(d)).join('')) + prev;
}, 0);

console.log(result);
