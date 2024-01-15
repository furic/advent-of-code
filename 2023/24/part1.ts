const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

const hailstones = [];

for (const line of input) {
    hailstones.push(line.split(" @ ").map(x => x.split(", ").map(y => Number(y)).slice(0, -1)));
}

let result = 0;

for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
        const h1 = hailstones[i];
        const h2 = hailstones[j];
        const denominator = h1[1][0] * h2[1][1] - h2[1][0] * h1[1][1];
        if (denominator === 0) { // parallel
            continue;
        }
        const factor1 = h1[0][0] * (h1[0][1] + h1[1][1] * 1e14) - h1[0][1] * (h1[0][0] + h1[1][0] * 1e14);
        const factor2 = h2[0][0] * (h2[0][1] + h2[1][1] * 1e14) - h2[0][1] * (h2[0][0] + h2[1][0] * 1e14);
        const x = (factor2 * h1[1][0] - factor1 * h2[1][0]) / denominator / 1e14;
        const y = (factor2 * h1[1][1] - factor1 * h2[1][1]) / denominator / 1e14;
        if (x >= 2e14 && x <= 4e14 && y >= 2e14 && y <= 4e14 && (x - h1[0][0]) / h1[1][0] >= 0 && (x - h2[0][0]) / h2[1][0] >= 0) {
            result++;
        }
    }
}

console.log(result);