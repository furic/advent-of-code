import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n");

const seeds = input[0].split(": ")[1].split(" ").map(x => Number(x));
const maps = input.slice(2).map(x => x.split(" ").map(y => Number(y)));
const results = [];

function translate(index, value) {
    if (index === maps.length) return value;

    const [destination, source, range] = maps[index];

    if (source <= value && value < source + range) {
        let nextMapIndex = index + 1;
        for (; nextMapIndex < maps.length && maps[nextMapIndex].length === 3 ; nextMapIndex++);
        // console.log(value + ' mapped to ' + (destination + value - source), destination, source, range, index, newIndex);
        return translate(nextMapIndex, destination + value - source);
    }

    return translate(index + 1, value);
}

for (const seed of seeds) {
    results.push(translate(0, seed));
}

console.log(Math.min(...results));