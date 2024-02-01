const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

let start = { x: 0, y: 0, e: 0 };
let end = { x: 0, y: 0, e: 0 };

const maze = input.map((line, row) =>
    line.split("").map((cell, column) => {
        if (cell === "S") {
            return (start = { x: column, y: row, e: "a".charCodeAt(0) });
        } else if (cell === "E") {
            return (end = { x: column, y: row, e: "z".charCodeAt(0) });
        } else {
            return { x: column, y: row, e: cell.charCodeAt(0) };
        }
    })
);
const queue = [{ ...start, steps: 0 }];
const visited = new Set(`${start.x},${start.y}}`);

let result = 0;

while (queue.length > 0) {
    const current = queue.shift();
    if (current.x === end.x && current.y === end.y) {
        result = current.steps;
        break;
    }
    const neighbors = [
        maze[current.y - 1] && maze[current.y - 1][current.x],
        maze[current.y + 1] && maze[current.y + 1][current.x],
        maze[current.y][current.x - 1],
        maze[current.y][current.x + 1],
    ]
        .filter(cell => cell && !visited.has(`${cell.x},${cell.y}`))
        .filter(cell => cell.e - current.e <= 1)
        .map(cell => ({ ...cell, steps: current.steps + 1 }));
    neighbors.forEach(cell => visited.add(`${cell.x},${cell.y}`));
    queue.push(...neighbors);
}

console.log(result);