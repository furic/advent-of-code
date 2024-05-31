import * as fs from 'fs';

const input = fs.readFileSync("input", "utf8").split("\n").map((x) => x.split(" "));

const winMap = { A: "B", B: "C", C: "A" };
const loseMap = { A: "C", B: "A", C: "B" };
const scoreMap = { A: 1, B: 2, C: 3 };

let result = 0;

for (const [opponent, win] of input) {
    if (win === "X") {
        result += scoreMap[loseMap[opponent]];
    } else if (win === "Y") {
        result += scoreMap[opponent] + 3;
    } else {
        result += scoreMap[winMap[opponent]] + 6;
    }
}

console.log(result);