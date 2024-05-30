import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n").map(x => x.split(" ").map((y, i) => y = i === 1 ? Number(y) : y));

const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };
const visited = new Set([`0,0`]);

for (const [direction, count] of input) {
    for (let i = 0; i < count; i++) {
        if (direction === 'R') head.x++;
        if (direction === 'L') head.x--;
        if (direction === 'D') head.y++;
        if (direction === 'U') head.y--;
        if (Math.abs(head.x - tail.x) === 2 || Math.abs(head.y - tail.y) === 2) {
            tail.x += Math.sign(head.x - tail.x);
            tail.y += Math.sign(head.y - tail.y);
        }
        visited.add(`${tail.x},${tail.y}`);
    }
}

console.log(visited.size);