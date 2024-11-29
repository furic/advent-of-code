import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map(x => x.split('').map(Number));

const increment = (i: number, j: number) => {
    if (input[i]?.[j] !== undefined) {
        input[i][j]++;
        if (input[i][j] === 10) {
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
            directions.forEach(([di, dj]) => increment(i + di, j + dj));

        }
    }
}

let result = 0;

for (let n = 0; n < 100; n++) {
    input.forEach((row, i) => row.forEach((_, j) => increment(i, j)));
    input.forEach((row, i) =>
        row.forEach((value, j) => {
            if (value > 9) {
                result++;
                input[i][j] = 0;
            }
        })
    );
}

console.log(result);