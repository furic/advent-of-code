import * as fs from 'fs';

let input = fs.readFileSync('input', 'utf8').split('\n\n');

let ranges = input[0]
	.split('\n')
	.map((x) => x.split('-').map(Number))
	.sort((a, b) => a[0] - b[0]);

const merged: number[][] = [];
for (const [start, end] of ranges) {
	if (merged.length === 0 || merged[merged.length - 1][1] < start - 1) {
		// No overlap/adjacency - start new range
		merged.push([start, end]);
	} else {
		// Overlap or adjacent - extend current range
		merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
	}
}

const result = merged.reduce((sum, [start, end]) => sum + (end - start + 1), 0);

console.log(result);
