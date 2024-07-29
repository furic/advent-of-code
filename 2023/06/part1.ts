import * as fs from "fs";
const input = fs.readFileSync("input", "utf8").split("\n");

let result = 1;

const recordDistance = input[1]
  .split(": ")[1]
  .split(" ")
  .map((x) => Number(x))
  .filter(Number);
const timeDistance = input[0]
  .split(": ")[1]
  .split(" ")
  .map((x) => Number(x))
  .filter(Number)
  .map((x, i) => [x, recordDistance[i]]);

for (const [time, distance] of timeDistance) {
  let wayCount = 0;
  for (let i = 1; i < time - 1; i++) {
    const newDistance = (time - i) * i;
    if (newDistance > distance) {
      wayCount++;
    }
  }
  result *= wayCount;
}

console.log(result);
