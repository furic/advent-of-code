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

const fixOrder = (values: number[]) => {
	while (true) {
		let swapped = false;
		for (let i = 0; i < values.length - 1; i++) {
			const requiredPages = rules[values[i]] || [];
			const nextPages = values.slice(i + 1);
			const wrongOrderPageIndex = nextPages.findIndex(value => requiredPages.includes(value));
			if (wrongOrderPageIndex !== -1) {
				const wrongOrderPageValue = nextPages[wrongOrderPageIndex];
				values.splice(i + 1 + wrongOrderPageIndex, 1);
				values.splice(i, 0, wrongOrderPageValue);
				swapped = true;
				break;
			}
		}
		if (!swapped) break;
	}
	return values;
};

const incorrectOrderedUpdates = updates.filter((values) => !isRightOrder(values));

const correctOrderedUpdates = incorrectOrderedUpdates.map(fixOrder);

const result = correctOrderedUpdates.reduce((acc, values) => acc + values[Math.floor(values.length / 2)], 0);

console.log(result);
