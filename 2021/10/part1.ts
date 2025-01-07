import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const SCORE_MAP = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

const filterChunks = (line: string) => {
	for (let len = 0; line.length !== len; ) {
		len = line.length;
		line = line.replace(/\(\)|\[\]|\{\}|<>/g, '');
	}
	return line;
};

const getScore = (line: string) => SCORE_MAP[line.split('').find((c) => ')]}>'.includes(c))] || 0;

const scores = input.map((line) => getScore(filterChunks(line)));

console.log(scores.reduce((a, b) => a + b));
