import * as fs from 'fs';

const input = fs.readFileSync("input", "utf8").split("\n");

let result = '';
let cycle = 0;
let x = 1;

const progress = () => {
    if (cycle % 40 === 0) {
        result += '\n';
    }
    result += Math.abs((cycle % 40) - x) <= 1 ? '#' : '.';
    cycle++;
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

console.log(result);