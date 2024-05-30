import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n");

const copies = Array(input.length).fill(1);

for (let i = 0; i < input.length; i++) {
    const [winningNumbers, numbers] = input[i].split(": ")[1].split(" | ").map(x => x.split(" ").filter(x => x != "").map(y => Number(y)));
    let winningAmount = 0;
    for (const winningNumber of winningNumbers) {
        if (numbers.includes(winningNumber)) winningAmount++;
    }
    for (let j = i + 1; j <= i + winningAmount; j++) {
        copies[j] += copies[i];
    }
}

const result = copies.reduce((a, x) => a + x, 0);
console.log(result);