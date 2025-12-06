import * as fs from 'fs';

let input = fs.readFileSync('input', 'utf8').split('\n\n');

const ranges = input[0].split('\n').map((x) => x.split('-').map(Number));
const ids = input[1].split('\n').map(Number);

const result = ids.filter((id) => {
	return ranges.some((range) => id >= range[0] && id <= range[1]);
}).length;

console.log(result);
