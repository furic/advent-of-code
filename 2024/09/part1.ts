import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('').map(Number);
const disk: (number | undefined)[] = [];

input.forEach((num, index) => {
	if (index % 2 === 0) {
		const id = index / 2;
		disk.push(...(Array(num).fill(id)));
	} else {
		disk.push(...(Array(num).fill(undefined)));
	}
});

for (let i = disk.length - 1; ; i--) {
	if (disk[i] !== undefined) {
		const emptyIndex = disk.findIndex((e) => e === undefined);
		if (emptyIndex > i) break;
		disk[emptyIndex] = disk[i];
		disk[i] = undefined;
	}
}

const result = disk.reduce((acc, num, index) => acc + (num ? num * index : 0), 0);

console.log(result);
