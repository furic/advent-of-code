import * as fs from 'fs';

const input = fs.readFileSync("input", "utf8").split("\n").map(line => {
    const [direction, value] = line.split(' ');
    return { direction, value: +value };
});

let [pos, aim] = [0, 0];

for (const line of input) {
    if (line.direction === 'forward') {
        pos += line.value;
    }
    if (line.direction === 'down') {
      y += line.value;
    }
    if (line.direction === 'up') {
      y -= line.value;
    }
  }

console.log(x * y);