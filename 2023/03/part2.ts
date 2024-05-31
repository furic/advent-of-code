import * as fs from 'fs';

const input = fs.readFileSync("example", "utf8").split("\n");

const getNumber = (indices: [number, number]) => {
    const i = indices[0];
    const j = indices[1];
    let number = '' + input[i][j];
    let jMinor = j;
    while (jMinor > 0 && /\d/.test(input[i][--jMinor])) {
        number = input[i][jMinor] + number;
    }
    let jPlus = j;
    while (jPlus < input[0].length - 1 && /\d/.test(input[i][++jPlus])) {
        number = number + input[i][jPlus];
    }
    return +number;
}

let result = 0;

for (let i = 0; i < input.length; i++) {
    const matches = Array.from(input[i].matchAll(/\*/g));
    for (const match of matches) {
        const j = match.index;
        const surrounding = [
            (input[i - 1] ?? "")[j - 1] ?? ".",
            (input[i - 1] ?? "")[j] ?? ".",
            (input[i - 1] ?? "")[j + 1] ?? ".",
            (input[i] ?? "")[j - 1] ?? ".",
            (input[i] ?? "")[j] ?? ".",
            (input[i] ?? "")[j + 1] ?? ".",
            (input[i + 1] ?? "")[j - 1] ?? ".",
            (input[i + 1] ?? "")[j] ?? ".",
            (input[i + 1] ?? "")[j + 1] ?? "."
        ];
        const indices = [
            [i - 1, j - 1],
            [i - 1, j],
            [i - 1, j + 1],
            [i, j - 1],
            [i, j],
            [i, j + 1],
            [i + 1, j - 1],
            [i + 1, j],
            [i + 1, j + 1]
        ];
        const localNumberIndices = [];
        for (let k = 0; k < surrounding.length; k++) {
            if (/\d/.test(surrounding[k]) && (!/\d/.test(surrounding[k - 1] ?? "") || k % 3 == 0)) {
                localNumberIndices.push(indices[k]);
            }
        }
        if (localNumberIndices.length === 2) {
            let number1 = getNumber(localNumberIndices[0]);
            let number2 = getNumber(localNumberIndices[1]);
            result += number1 * number2;
        }
    }
}

console.log(result);