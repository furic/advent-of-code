const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

const seeds = input[0].split(": ")[1].split(" ").map(x => Number(x)).reduce((a, x, i) => {
    if (i % 2 == 0) a.push([]);
    return a[a.length - 1].push(x), a;
}, []);
console.log(seeds);
const maps = input.slice(2).map(x => x.split(" ").map(y => Number(y)));
const results = [];

function expand(index, values) {
    if (index === maps.length) return [values];

    const result = [];
    const [destination, source, range] = maps[index];

    // if (source <= value && value < source + range) {
    //     let newIndex = index + 1;
    //     for (; newIndex < maps.length && maps[newIndex].length === 3 ; newIndex++);
    //     // console.log(value + ' translated to ' + (destination + value - source), destination, source, range, index, newIndex);
    //     return translate(newIndex, destination + value - source);
    // }

    let nextIndex = index + 1;
    for (; nextIndex < maps.length && maps[nextIndex].length === 3 ; nextIndex++);

    if (values[0] < source && values[0] + values[1] > source && values[0] + values[1] <= source + range) { // tail part within a map
        const firstTuple = [values[0], source - values[0]];
        const lastTuple = [destination, values[1] - source + values[0]];
        // console.log('last part of ' + values + ' translated to ' + lastTuple, destination, source, range, index, nextIndex);
        result.push(...expand(nextIndex, lastTuple), ...expand(index, firstTuple));
    }
    else if (values[0] >= source && values[0] < source + range && values[0] + values[1] > source + range) { // front part within a map
        const firstTuple = [destination + values[0] - source, source + range - values[0]];
        const lastTuple = [source + range, values[0] + values[1] - source - range];
        // console.log('first part of ' + values + ' translated to ' + firstTuple, destination, source, range, index, nextIndex);
        result.push(...expand(nextIndex, firstTuple), ...expand(index, lastTuple));
    }
    else if (values[0] >= source && values[0] + values[1] <= source + range) { // whole part within a map
        // console.log('first part of ' + values + ' translated to ' + [destination + values[0] - source, values[1]], destination, source, range, index, nextIndex);
        result.push(...expand(nextIndex, [destination + values[0] - source, values[1]]));
    }
    else if (values[0] < source && values[0] + values[1] > source + range) { // whole part cover a map
        const firstTuple = [values[0], source - values[0]];
        const middleTuple = [destination, range];
        const lastTuple = [source + range, values[0] + values[1] - source - range];
        // console.log('middle part of ' + values + ' translated to ' + [destination, range], destination, source, range, index, nextIndex);
        result.push(...expand(index, lastTuple), ...expand(nextIndex, middleTuple), ...expand(index, firstTuple));
    }

    if (result.length === 0) result.push(...expand(index + 1, values));
    return result;
}

for (const seed of seeds) {
    results.push(expand(0, seed));
}

console.log(results);
console.log(Math.min(...results.flat().map(x => x[0])));