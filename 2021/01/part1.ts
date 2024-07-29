import * as fs from "fs";

const input = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((value) => +value);

let result = 0;

for (let i = 1; i < input.length; i++) {
  result += input[i] > input[i - 1] ? 1 : 0;
}

console.log(result);
