const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

let result = 0;

const moves = input[0].replace(/L/g, "0").replace(/R/g, "1").split("");
const nodes = {};
for (const line of input.slice(2)) {
    const values = line.split(" = ");
    nodes[values[0]] = values[1].replace("(", "").replace(")", "").split(", ");
}

let current = "AAA";
while (current != "ZZZ") {
    for (const move of moves) {
        current = nodes[current][move];
        result++;
        if (current == "ZZZ") break;
    }
}

console.log(result);