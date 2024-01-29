const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

let path: string[] = [];
const dirs = {};

for (const line of input) {
    let _a, _b;

    let dirName = (_a = line.match(/\$ cd ([\w\/.]+)/)) === null || _a === void 0 ? void 0 : _a[1];
    if (dirName === "/") {
        path = [""];
        continue;
    } else if (dirName === "..") {
        path.pop();
        continue;
    } else if (dirName) {
        path.push(dirName);
        continue;
    }

    let size = (_b = line.match(/(\d+) .+/)) === null || _b === void 0 ? void 0 : _b[1];
    if (size) {
        path.forEach((dir, i) => {
            var key = path.slice(0, i).join("/") + "/" + dir;
            dirs[key] ??= 0;
            dirs[key] += +size;
        });
        continue;
    }
}

const result = Object.values(dirs).reduce((a, b) => b > 100000 ? a : (a + b), 0);

console.log(result);