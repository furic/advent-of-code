import * as fs from "fs";
const input = fs.readFileSync("input", "utf8").split("\n");

let x = 0;
let y = 0;
const points = [];
let perimeter = 0;
for (let i = 0; i < input.length; i++) {
  const line = input[i].split(" ");
  const direction = line[0];
  const steps = Number(line[1]);
  switch (direction) {
    case "R":
      x += steps;
      break;
    case "L":
      x -= steps;
      break;
    case "U":
      y -= steps;
      break;
    case "D":
      y += steps;
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
