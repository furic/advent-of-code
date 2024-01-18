const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n").map((x) => x.split(" "));

const winMap = { A: "Y", B: "Z", C: "X" };
const drawMap = { A: "Y", B: "Z", C: "X" };
const scoreMap = { X: 1, Y: 2, Z: 3 };

let result = 0;

for (const [opponent, you] of input) {
    if (winMap[opponent] === you) {
        result += 6;
    } else if (drawMap[opponent] === you) {
        result += 3;
    }
    result += scoreMap[you];
}

console.log(result);