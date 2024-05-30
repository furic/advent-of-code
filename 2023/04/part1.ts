import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n");

let result = 0;

for (const line of input) {
    const [winningNumbers, numbers] = line.split(": ")[1].split(" | ").map(x => x.split(" ").filter(x => x != "").map(y => Number(y)));
    let winningAmount = 0.5;
    for (const winningNumber of winningNumbers) {
        if (numbers.includes(winningNumber)) winningAmount *= 2;
    }
    if (winningAmount < 1) continue;
    result += winningAmount;
}

console.log(result);