const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

let sum = 0;
let cycle = 0;
let x = 1;

const progress = () => {
    cycle++;
    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
        sum += x * cycle;
    }
};

for (const line of input) {
    if (line === 'noop') {
        progress();
    } else {
        progress();
        progress();
        x += Number(line.split(' ')[1]);
    }
}

console.log(sum);