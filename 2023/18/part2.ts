import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n");

let x = 0;
let y = 0;
const points = [];
let perimeter = 0;
for (let i = 0; i < input.length; i++) {
    const line = input[i].match(/\(#([0-9a-f]+)\)/)[1];
    const steps = Number('0x' + line.slice(0, -1));
    const direction = Number(line.slice(-1));
    switch (direction) {
        case 0:
            x += steps;
            break;
        case 1:
            y += steps;
            break;
        case 2:
            x -= steps;
            break;
        case 3:
            y -= steps;
            break;
    }
    perimeter += steps;
    points.push([x, y]);
}

let result = 0;

for (let i = 0; i < points.length - 1; i++) {
    // Shoelace formula
    result += points[i][0] * points[i + 1][1] - points[i + 1][0] * points[i][1];
}
result += perimeter;

console.log(Math.floor(result / 2) + 1);