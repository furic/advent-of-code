import * as fs from "fs";
const input = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((x) => x.split(""));

let result = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] == "O") {
      for (let k = i - 1; k >= 0 && input[k][j] === "."; k--) {
        input[k][j] = "O";
        input[k + 1][j] = ".";
      }
    }
  }
}

for (let i = 0; i < input.length; i++) {
  result += input[i].filter((x) => x === "O").length * (input.length - i);
}

console.log(result);
