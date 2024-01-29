const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n").map(x => x.split("").map(y => ({ height: Number(y) })));

const calcVisibility = (tree, max) => {
    if (tree.height > max) {
        tree.visible = true;
        max = tree.height;
    }
    return max;
};

for (let i = 0; i < input.length; i++) { // each row
    for (let j = 0, max = -1; j < input[i].length; j++) { // left to right
        max = calcVisibility(input[i][j], max);
    }
    for (let j = input[i].length - 1, max = -1; j >= 0; j--) { // right to left
        max = calcVisibility(input[i][j], max);
    }
}
for (let j = 0; j < input[0].length; j++) { // each column
    for (let i = 0, max = -1; i < input.length; i++) { // top to bottom
        max = calcVisibility(input[i][j], max);
    }
    for (let i = input.length - 1, max = -1; i >= 0; i--) { // bottom to top
        max = calcVisibility(input[i][j], max);
    }
}

let result = 0;

input.forEach((line) => result += line.filter(x => x.visible).length);

console.log(result);