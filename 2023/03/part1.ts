import * as fs from "fs";

const input = fs.readFileSync("input", "utf8").split("\n");

let result = 0;

for (let i = 0; i < input.length; i++) {
  const matches = Array.from(input[i].matchAll(/\d+/g));
  for (const match of matches) {
    for (let j = match.index; j < match.index + match[0].length; j++) {
      const surrounding = [
        (input[i - 1] ?? "")[j - 1] ?? ".",
        (input[i - 1] ?? "")[j] ?? ".",
        (input[i - 1] ?? "")[j + 1] ?? ".",
        (input[i] ?? "")[j - 1] ?? ".",
        (input[i] ?? "")[j] ?? ".",
        (input[i] ?? "")[j + 1] ?? ".",
        (input[i + 1] ?? "")[j - 1] ?? ".",
        (input[i + 1] ?? "")[j] ?? ".",
        (input[i + 1] ?? "")[j + 1] ?? ".",
      ];
      if (surrounding.some((x) => /[^0-9.]/.test(x))) {
        result += Number(match[0]);
        break;
      }
    }
  }
}

console.log(result);
