import * as fs from "fs";

const input = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((x) => x.split("").map((y) => ({ height: +y })));

let result = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = input[i].length - 1; j >= 0; j--) {
    let score = 0;
    let scoreSum = 1;

    for (let xi = i + 1; xi < input.length; xi++) {
      // to right
      score++;
      if (input[xi][j].height >= input[i][j].height) break;
    }
    scoreSum *= score;

    score = 0;
    for (let xi = i - 1; xi >= 0; xi--) {
      score++;
      if (input[xi][j].height >= input[i][j].height) break;
    }
    scoreSum *= score;

    score = 0;
    for (let xj = j + 1; xj < input[0].length; xj++) {
      score++;
      if (input[i][xj].height >= input[i][j].height) break;
    }
    scoreSum *= score;

    score = 0;
    for (let xj = j - 1; xj >= 0; xj--) {
      score++;
      if (input[i][xj].height >= input[i][j].height) break;
    }
    scoreSum *= score;

    result = Math.max(scoreSum, result);
  }
}

console.log(result);
