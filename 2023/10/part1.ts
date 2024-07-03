import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n");

let result = 0;

const rows = input.length;
const cols = input[0].length;

const startingRow = input.findIndex(row => row.includes('S'));
const startingCol = input[startingRow].indexOf('S');

const canGoUp = ["|", "7", "F"].includes(input[startingRow - 1][startingCol]);
const canGoDown = ["|", "L", "J"].includes(input[startingRow + 1][startingCol]);
const canGoLeft = ["-", "L", "F"].includes(input[startingRow][startingCol - 1]);
const canGoRight = ["-", "7", "J"].includes(input[startingRow][startingCol + 1]);

let direction = 0; // up, right, down, left

if (canGoUp && canGoDown) {
		direction = 0;
} else if (canGoUp && canGoRight) {
		direction = 0;
} else if (canGoUp && canGoLeft) {
		direction = 0;
} else if (canGoDown && canGoRight) {
		direction = 2;
} else if (canGoDown && canGoLeft) {
		direction = 2;
} else if (canGoLeft && canGoRight) {
		direction = 1;
}

const rowDirections = [-1, 0, 1, 0];
const colDirections = [0, 1, 0, -1];

let row = startingRow;
let col = startingCol;

while (true) {
		result++;
		row += rowDirections[direction];
		col += colDirections[direction];
		switch (input[row][col]) {
				case "L":
				case "7":
						direction ^= 3;
						break;
				case "J":
				case "F":
						direction ^= 1;
						break;
		}

		if (row == startingRow && col == startingCol) {
				break;
		}
}

console.log(Math.floor(result / 2));