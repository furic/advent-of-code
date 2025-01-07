import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const SCORE_MAP = { '(': 1, '[': 2, '{': 3, '<': 4 };

const filterChunks = (line: string) => {
	for (let len = 0; line.length !== len; ) {
		len = line.length;
		line = line.replace(/\(\)|\[\]|\{\}|<>/g, '');
	}
	return line;
};

const isIncomplete = (line: string) => [')', ']', '}', '>'].every((char) => !line.includes(char));

const getScore = (line: string) => {
	const chars = line.split('').reverse();
	return chars.reduce((total, c) => total * 5 + SCORE_MAP[c], 0);
};

const incompleteLines = input
	.map((line) => filterChunks(line))
	.filter((line) => isIncomplete(line));

const scores = incompleteLines.map((line) => getScore(line)).sort((a, b) => a - b);

console.log(scores[Math.floor(scores.length / 2)]);
