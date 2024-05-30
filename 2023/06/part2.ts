import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n");

let result = 0;

const time = Number(input[0].split(": ")[1].replace(/ /g, ""));
const distance = Number(input[1].split(": ")[1].replace(/ /g, ""));

for (let i = 1; i < time - 1; i++) {
    const newDistance = (time - i) * i;
    if (newDistance > distance)
        result++;
}

console.log(result);