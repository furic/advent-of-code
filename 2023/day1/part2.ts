const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
    if (err) throw err;
    processFile(data.toString())
});

function processFile(input) {

    const NUMBER_MAP = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }

    let lines = input.split('\n');

    let sum = 0;

    lines.map((line) => {
        const matches = [];
          for (const [key, value] of Object.entries(NUMBER_MAP)) 
              matches.push(...line.matchAll(new RegExp(key, "g")), ...line.matchAll(new RegExp(value, "g")));
          matches.sort((a, b) => a.index - b.index);
          let numbers = matches.map((m) => m[0]);
          numbers = numbers.map((n) => NUMBER_MAP[n] ?? n);
          sum += Number(numbers[0] + '' + numbers[numbers.length - 1]);
    });

    console.log(sum);
}