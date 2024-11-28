import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map(x => x.split('').map(n => Number(n)));

const getNeighbors = (x: number, y: number) => [
    input[x - 1]?.[y],
    input[x + 1]?.[y],
    input[x]?.[y - 1],
    input[x]?.[y + 1],
].filter(n => n !== undefined);

let result = 0;

for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[x].length; y++) {
        const neighbors = getNeighbors(x, y);;
        const highNeighbors = neighbors.filter((n) => n > input[x][y]);
        if (highNeighbors.length === neighbors.length) {
            result += input[x][y] + 1;
        }
    }
}

console.log(result);
