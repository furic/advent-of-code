import * as fs from "fs";

const input = fs.readFileSync("input", "utf8").split("\n");

const findMostCommonBit = (numbers: string[], index: number): string => {
  const counter = numbers.filter((number) => number[index] === "1").length;
  return counter >= numbers.length / 2 ? "1" : "0";
};

let numbers = [...input];
while (numbers.length > 1) {
  for (let digit = 0; numbers.length > 1; digit++) {
    const bit = findMostCommonBit(numbers, digit);
    numbers = numbers.filter((number) => number[digit] === bit);
  }
}
const mostCommonValue = parseInt(numbers[0], 2);

numbers = [...input];
while (numbers.length > 1) {
  for (let digit = 0; numbers.length > 1; digit++) {
    let bit = findMostCommonBit(numbers, digit);
    bit = bit === "1" ? "0" : "1";
    numbers = numbers.filter((number) => number[digit] === bit);
  }
}
const leastCommonValue = parseInt(numbers[0], 2);

console.log(mostCommonValue * leastCommonValue);
