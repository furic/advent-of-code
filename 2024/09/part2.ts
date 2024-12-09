import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('').map(Number);
const disk: (number | undefined)[] = [];
const fileSizeMap: Map<number, number> = new Map();

input.forEach((num, index) => {
	if (index % 2 === 0) {
		const id = index / 2;
		fileSizeMap.set(id, num);
		disk.push(...(Array(num).fill(id)));
	} else {
		disk.push(...(Array(num).fill(undefined)));
	}
});

for (let i = disk.length - 1; i >= 0; i--) {
	if (disk[i] !== undefined) {
		const fileSize = fileSizeMap.get(disk[i]);
		i -= fileSize - 1;
		for (let j = 0; j <= i - fileSize; j++) {
			if (disk.slice(j, j + fileSize).every((value) => value === undefined)) {
				for (let k = 0; k < fileSize; k++) {
					disk[j + k] = disk[i + k];
					disk[i + k] = undefined;
				}
				break;
			}
		}
	}
}

const result = disk.reduce((acc, num, index) => acc + (num ? num * index : 0), 0);

console.log(result);
