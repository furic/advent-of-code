import * as fs from "fs";
const input = fs.readFileSync("input", "utf8").split("\n");

let sum = 0;
for (const num of input) {
  let result = 0;
  let multiplier = 1;
  for (let i = num.length - 1; i >= 0; i--) {
    result +=
      multiplier * (num[i] === "=" ? -2 : num[i] === "-" ? -1 : Number(num[i]));
    multiplier *= 5;
  }
  sum += result;
}

const arr = sum.toString(5).split("");
let answer = [];
for (let i = arr.length - 1; i >= 0; i--) {
  if (+arr[i] < 3) {
    answer.unshift(arr[i]);
  } else {
    const next = +arr[i] - 5;
    answer.unshift(next === -2 ? "=" : next === -1 ? "-" : `${next}`);
    arr[i - 1] = `${+arr[i - 1] + 1}`;
  }
}

console.log(answer.join(""));
