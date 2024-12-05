import * as fs from 'fs';

const [rawRules, rawUpdates] = fs.readFileSync('input', 'utf8').split('\n\n');
const rules = rawRules.split('\n').reduce((acc, line) => {
	const [prev, key] = line.split('|').map(Number);
	acc[key] = [...(acc[key] || []), prev];
	return acc;
}, {});
const updates = rawUpdates.split('\n').map((line) => line.split(',').map(Number));

const isRightOrder = (values: number[]) => {
	for (let i = 0; i < values.length - 1; i++) {
		const requiredPages = rules[values[i]] || [];
		const nextPages = values.slice(i + 1);
		if (requiredPages.some((value: number) => nextPages.includes(value))) {
			return false;
		}
	}
	return true;
};

const correctOrderedUpdates = updates.filter(isRightOrder);

const result = correctOrderedUpdates.reduce((acc, values) => acc + values[Math.floor(values.length / 2)], 0);

console.log(result);
