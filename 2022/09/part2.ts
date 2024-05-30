import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n").map(x => x.split(" ").map((y, i) => y = i === 1 ? Number(y) : y));

const knots = new Array(10).fill().map(() => ({ x: 0, y: 0 }));
const visited = new Set([`0,0`]);

for (const [direction, count] of input) {
    for (let i = 0; i < count; i++) {
        if (direction === 'R') knots[0].x++;
        if (direction === 'L') knots[0].x--;
        if (direction === 'D') knots[0].y++;
        if (direction === 'U') knots[0].y--;
        for (let j = 1; j < knots.length; j++) {
            const [head, tail] = [knots[j - 1], knots[j]];
            if (Math.abs(head.x - tail.x) === 2 || Math.abs(head.y - tail.y) === 2) {
                tail.x += Math.sign(head.x - tail.x);
                tail.y += Math.sign(head.y - tail.y);
            }
        }
        visited.add(`${knots[9].x},${knots[9].y}`);
    }
}

console.log(visited.size);