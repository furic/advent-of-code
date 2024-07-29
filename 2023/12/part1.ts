import * as fs from "fs";
const input = fs.readFileSync("input", "utf8").split("\n");

let result = 0;

const cache = {};

function trimStart(str) {
  return str.startsWith(".")
    ? str
        .split(/(?<=\.)(?=[^.])/)
        .slice(1)
        .join("")
    : str;
}

function findCombinations(row, groups) {
  const line = row + " " + groups.join(",");
  if (cache[line]) {
    return cache[line];
  }
  if (groups.length <= 0) {
    return Number(!row.includes("#"));
  }
  if (row.length - groups.reduce((a, b) => a + b) - groups.length + 1 < 0) {
    return 0;
  }

  const firstGroup = groups[0];
  const isFirstGroupDamagedOrUnknown = !row.slice(0, groups[0]).includes(".");
  if (row.length === firstGroup) {
    return Number(isFirstGroupDamagedOrUnknown);
  }

  return (cache[line] ??=
    (row[0] != "#" ? findCombinations(trimStart(row.slice(1)), groups) : 0) +
    (isFirstGroupDamagedOrUnknown && row[firstGroup] != "#"
      ? findCombinations(trimStart(row.slice(firstGroup + 1)), groups.slice(1))
      : 0));
}

for (const line of input) {
  const [row, groups] = line
    .split(" ")
    .map((x, i) => (i == 1 ? x.split(",").map((y) => Number(y)) : x));
  result += findCombinations(row, groups);
}

console.log(result);
