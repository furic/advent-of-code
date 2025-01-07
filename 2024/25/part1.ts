import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n\n');

const maxSumHeight = 5;

const locks: number[][] = [];
const keys: number[][] = [];
input.forEach((rawGraph) => {
	const graph = rawGraph.split('\n').map((line) => line.split(''));
	const heights = graph[0].map((_, colIndex) =>
		graph.reduce((count, row) => count + (row[colIndex] === '#' ? 1 : 0), -1),
	);
	(graph[0][0].startsWith('#') ? locks : keys).push(heights);
});

let result = 0;

locks.forEach((lock) => {
	keys.forEach((key) => {
		const summedHeights = lock.map((height, index) => height + key[index]);
		result += Number(summedHeights.every((height) => height <= maxSumHeight));
	});
});

console.log(result);
