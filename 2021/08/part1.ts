import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map(x => x.split(" | ")[1].split(" "));

const result = input.flat().filter(x => x.length !== 5 && x.length !== 6).length; // 2, 3, 4, 7

console.log(result);
