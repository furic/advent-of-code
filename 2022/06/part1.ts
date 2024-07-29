import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8');

const markerLength = 4;

let index = 0;
for (; index < input.length; index++) {
	const uniqueCount = new Set(input.substring(index, index + markerLength).split('')).size;
	if (uniqueCount === markerLength) {
		break;
	}
}

console.log(index + markerLength);
