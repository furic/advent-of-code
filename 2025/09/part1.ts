import * as fs from 'fs';

const points = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(',').map(Number));

let maxArea = 0;
for (let i = 0; i < points.length; i++) {
	for (let j = i + 1; j < points.length; j++) {
		const [x1, y1] = points[i];
		const [x2, y2] = points[j];
		const area = Math.abs(x1 - x2 + 1) * Math.abs(y1 - y2 + 1);
		maxArea = Math.max(maxArea, area);
	}
}

console.log(maxArea);
