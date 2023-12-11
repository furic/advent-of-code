const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
    if (err) throw err;
    processFile(data.toString())
});

function processFile(input) {

    let lines = input.split('\n');

    let sum = 0;

    lines.map((line) => {
    line = line.replace(/[^0-9]/g, '');
    line = line[0] + line[line.length - 1];
    sum += Number(line);
    });

    console.log(sum);
}