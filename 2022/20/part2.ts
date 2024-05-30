import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split('\n').map((x: string) => ({ value: +x * 811589153 }));

const numbers = [...input];

for (let i = 0; i < 10; i++) {
  for (const move of input) {
    const prev = numbers.indexOf(move);
    numbers.splice(prev, 1);
    const next = (prev + move.value) % numbers.length;
    if (next === 0 && move.value !== 0) { // push to end instead if next index is 0
      numbers.push(move);
    } else {
      numbers.splice(next, 0, move);
    }
  }
}

const base = numbers.findIndex(x => x.value === 0);
let coordinates = numbers[(base + 1000) % numbers.length].value +
  numbers[(base + 2000) % numbers.length].value +
  numbers[(base + 3000) % numbers.length].value

console.log(coordinates);