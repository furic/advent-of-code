const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

let result = 0;

const seeds = input[0].split(": ")[1].split(" ").map(x => Number(x));
const maps = input.slice(2).map(y => y.split(" ").map(z => Number(z)));

const results = [];

function translate(index, value) {
    if (index === maps.length) return value;

    const [destination, source, range] = maps[index];

    if (source <= value && value < source + range) {
        let newIndex = index + 1;
        for (; newIndex < maps.length && maps[newIndex].length === 3 ; newIndex++);
        // console.log(value + ' translated to ' + (destination + value - source), destination, source, range, index, newIndex);
        return translate(newIndex, destination + value - source);
    }

    return translate(index + 1, value);
}

for (const seed of seeds) {
    results.push(translate(0, seed));
}

console.log(Math.min(...results));