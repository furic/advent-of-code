import * as fs from "fs";

const input = fs.readFileSync("input", "utf8").split("\n");

let path: string[] = [];
const dirs: Record<string, number> = {};

for (const line of input) {
  let _a, _b;

  let dirName =
    (_a = line.match(/\$ cd ([\w\/.]+)/)) === null || _a === void 0
      ? void 0
      : _a[1];
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

  let size =
    (_b = line.match(/(\d+) .+/)) === null || _b === void 0 ? void 0 : _b[1];
  if (size) {
    path.forEach((dir, i) => {
      var key = path.slice(0, i).join("/") + "/" + dir;
      dirs[key] ??= 0;
      dirs[key] += Number(size);
    });
    continue;
  }
}

let result = undefined;
const availableSpace = 70000000 - dirs["/"];
const spaceToFree = 30000000 - availableSpace;
Object.values(dirs).forEach((size) => {
  if (size >= spaceToFree && (!result || size < result)) {
    result = size;
  }
});

console.log(result);
