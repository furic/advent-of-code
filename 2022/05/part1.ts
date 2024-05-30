import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n\n");

const rawStacks = input[0].split("\n").map((line) => line.split(""));
const moves = input[1].split("\n");
const stacks = Array.from(Array(10), () => []);
rawStacks
    .reverse()
    .map((line) => line.map((c, col) => c.match(/[A-Z]/) && stacks[(col + 3) / 4].push(c)));

for (const move of moves) {
    let [count, from, to] = move.match(/\d+/g).map(Number);
    let load = stacks[from].splice(stacks[from].length - count, count);
    stacks[to].push(...load.reverse());
}

console.log(stacks.map((stack) => stack.pop()).join(""));