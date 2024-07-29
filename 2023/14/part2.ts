import * as fs from 'fs';
const input = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((x) => x.split(''));

let result = 0;

const cache = {};

function rollRocksNorth() {
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[i].length; j++) {
			if (input[i][j] == 'O') {
				for (let k = i - 1; k >= 0 && input[k][j] == '.'; k--) {
					input[k][j] = 'O';
					input[k + 1][j] = '.';
				}
			}
		}
	}
}

function rollRocksWest() {
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[i].length; j++) {
			if (input[i][j] == 'O') {
				for (let k = j - 1; k >= 0 && input[i][k] == '.'; k--) {
					input[i][k] = 'O';
					input[i][k + 1] = '.';
				}
			}
		}
	}
}

function rollRocksSouth() {
	for (let i = input.length - 1; i >= 0; i--) {
		for (let j = 0; j < input[i].length; j++) {
			if (input[i][j] == 'O') {
				for (let k = i + 1; k < input.length && input[k][j] == '.'; k++) {
					input[k][j] = 'O';
					input[k - 1][j] = '.';
				}
			}
		}
	}
}

function rollRocksEast() {
	for (let i = input.length - 1; i >= 0; i--) {
		for (let j = input[i].length - 1; j >= 0; j--) {
			if (input[i][j] == 'O') {
				for (let k = j + 1; k < input[i].length && input[i][k] == '.'; k++) {
					input[i][k] = 'O';
					input[i][k - 1] = '.';
				}
			}
		}
	}
}

let boardStr = '';
let stepCount = 0;
let loopCount = 0;
for (; stepCount < 1000000000; stepCount++) {
	const str = input.map((x) => x.join('')).join('');
	const test = cache[str];
	if (test) {
		if (str == boardStr) break;
		if (loopCount <= 0) boardStr = str;
		input.splice(0, input.length, ...test.map((x) => [...x]));
		loopCount++;
		continue;
	}
	rollRocksNorth();
	rollRocksWest();
	rollRocksSouth();
	rollRocksEast();
	cache[str] = input.map((x) => [...x]);
}

for (let i = 0; i < (1000000000 - stepCount) % loopCount; i++) {
	rollRocksNorth();
	rollRocksWest();
	rollRocksSouth();
	rollRocksEast();
}

for (let i = 0; i < input.length; i++) {
	result += input[i].filter((x) => x == 'O').length * (input.length - i);
}

console.log(result);
