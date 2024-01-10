const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n").map(x => x.split(""));

const rows = input.length;
const columns = input[0].length;
const shifts = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up, right, down, left
const checked = {};
const energized = Array(rows).fill(0).map(() => Array(columns).fill("."));
const queue = [{ row: 0, column: 0, direction: 1 }];

while (queue.length > 0) {
    const { row, column, direction } = queue.pop();
    const key = [row, column, direction].join(",");
    if (checked[key]) continue;
    checked[key] = true;
    if (row >= 0 && row < rows && column >= 0 && column < columns) {
        energized[row][column] = "#";
        const directions = [];
        switch (input[row][column]) {
            case "|":
                if (direction % 2) directions.push(0, 2);
                else directions.push(direction);
                break;
            case "-":
                if (!(direction % 2)) directions.push(1, 3);
                else directions.push(direction);
                break;
            case "/":
                directions.push(direction ^ 1);
                break;
            case "\\":
                directions.push(direction ^ 3);
                break;
            default:
                directions.push(direction);
                break;
        }
        for (const direction of directions) {
            queue.push({
                row: row + shifts[direction][0],
                column: column + shifts[direction][1],
                direction: direction
            });
        }
    }
}

console.log(energized.flat().filter(x => x === "#").length);