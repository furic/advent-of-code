const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n").map(x => x.split(""));

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
    input[startingRow][startingCol] = "|";
    direction = 0;
} else if (canGoUp && canGoRight) {
    input[startingRow][startingCol] = "L";
    direction = 0;
} else if (canGoUp && canGoLeft) {
    input[startingRow][startingCol] = "J";
    direction = 0;
} else if (canGoDown && canGoRight) {
    input[startingRow][startingCol] = "F";
    direction = 2;
} else if (canGoDown && canGoLeft) {
    input[startingRow][startingCol] = "7";
    direction = 2;
} else if (canGoLeft && canGoRight) {
    input[startingRow][startingCol] = "-";
    direction = 1;
}

const rowDirections = [-1, 0, 1, 0];
const colDirections = [0, 1, 0, -1];

let row = startingRow;
let col = startingCol;
let loopBoard = Array(rows).fill(0).map(() => Array(cols).fill("."));

while (true) {
    loopBoard[row][col] = input[row][col];
    
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

// Drawing a line between a point to any edge, if it cross the loop odd-number times, the point is within the loop
// Loop thought all points and get the cross section count to left edge, for up direction (|, L, or F) only
for (let i = 0; i < rows - 1; i++) {
    let crossSectionCount = 0;
    for (let j = 0; j < cols - 1; j++) {
        if (loopBoard[i][j] === '.') {
            if (crossSectionCount % 2 === 1) {
                loopBoard[i][j] = '1';
                result++;
            }
        } else if (['|', 'L', 'J'].includes(loopBoard[i][j]))
            crossSectionCount++;
        }
    }
}


console.log(result);