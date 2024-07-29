import * as fs from "fs";

const input = fs.readFileSync("input", "utf8").split("\n");

let result = 0;
let current = 0;

for (const line of input) {
  if (line == "") {
    result = Math.max(result, current);
    current = 0;
  } else {
    current += Number(line);
  }
}

console.log(result);
