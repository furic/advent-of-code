import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n");

let result = 0;

for (const line of input) {
    const values = line.split(" ").map(x => Number(x));
    const differences = [[...values]];
    while (differences[differences.length - 1].some(x => x != 0)) {
        differences.push(differences[differences.length - 1].map((x, i, r) => x - r[i - 1]).slice(1));
    }

    const lastNumbers = differences.map(x => x[x.length - 1]);
    result += lastNumbers.reduce((a, b) => a + b);
}

console.log(result);