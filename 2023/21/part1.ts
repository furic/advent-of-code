import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n").map(x => x.split(""));

const rows = input.length;
const columns = input[0].length;
const shifts = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const startingRow = input.findIndex(x => x.includes("S"));
const queue = [[startingRow, input[startingRow].indexOf("S")]];

for (let i = 0; i < 64; i++) {
    const prevQueue = [...queue];
    const queueSet = new Set();
    queue.length = 0;

    while (prevQueue.length > 0) {
        const pos = prevQueue.shift();
        
        for (const shift of shifts) {
            const row = pos[0] + shift[0];
            const column = pos[1] + shift[1];
            const nextPos = [row, column];
            if (row >= 0 && column >= 0 &&
                row < columns && column < rows &&
                input[row][column] !== "#" &&
                !queueSet.has(nextPos.join(","))) {
                queueSet.add(nextPos.join(","));
                queue.push(nextPos);
            }
        }
    }
}

console.log(queue.length);