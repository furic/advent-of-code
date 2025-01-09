import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.replaceAll(',', '').split(''));

const snails = input.map((line) =>
	line.map((char) => ({ '[': -Infinity, ']': Infinity })[char] ?? Number(char)),
);

const add = (a: number[], b: number[]) => {
	let snail = [-Infinity, ...a, ...b, Infinity];
	while (reduce(snail, false) || reduce(snail, true));
	return snail;
};

const reduce = (snail: number[], split: boolean) => {
	let depth = 0;
	let prevIndex = -1;
	for (let i = 0; i < snail.length; i++) {
		if (split && Number.isFinite(snail[i]) && snail[i] >= 10) {
			let half = snail[i] / 2;
			snail.splice(i, 1, -Infinity, Math.floor(half), Math.ceil(half), Infinity);
		}
		if (depth === 4 && snail[i] === -Infinity) {
			let nextIndex = i + 4;
			for (; nextIndex < snail.length && !Number.isFinite(snail[nextIndex]); nextIndex++);
			if (snail[prevIndex] !== undefined) snail[prevIndex] += snail[i + 1];
			if (snail[nextIndex] !== undefined) snail[nextIndex] += snail[i + 2];
			snail.splice(i, 4, 0);
			return true;
		}
		if (snail[i] === -Infinity) depth++;
		if (snail[i] === Infinity) depth--;
		if (Number.isFinite(snail[i])) prevIndex = i;
	}
	return false;
};

const getMagnitude = (snail: number[]) => {
	const isPair = (i: number) => Number.isFinite(snail[i + 1]) && Number.isFinite(snail[i + 2]);
	while (snail.length > 1) {
		const pairIndex = snail.findIndex((_, i) => isPair(i));
		const sum = 3 * snail[pairIndex + 1] + 2 * snail[pairIndex + 2];
		snail.splice(pairIndex, 4, sum);
	}
	return snail[0];
};

const result = getMagnitude(snails.reduce(add));

console.log(result);
