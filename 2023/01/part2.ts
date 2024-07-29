import * as fs from "fs";

const input = fs.readFileSync("input", "utf8").split("\n");

const NUMBER_MAP = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let sum = 0;

for (const line of input) {
  const matches = [];
  for (const [key, value] of Object.entries(NUMBER_MAP)) {
    const wordMatches = Array.from(line.matchAll(new RegExp(key, "g")));
    const numberMatches = Array.from(
      line.matchAll(new RegExp(value.toString(), "g")),
    );
    matches.push(...wordMatches, ...numberMatches);
  }
  matches.sort((a, b) => a.index - b.index);
  let numbers = matches.map((m) => m[0]);
  numbers = numbers.map((n) => NUMBER_MAP[n] ?? n);
  sum += +(numbers[0] + "" + numbers[numbers.length - 1]);
}

console.log(sum);
