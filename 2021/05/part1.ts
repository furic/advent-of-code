import * as fs from "fs";

const input = fs.readFileSync("input", "utf8").split("\n");

type Line = { from: number[]; to: number[] };

const lines = input.map((line) => {
  const [from, to] = line.split(" -> ").map((x) => x.split(",").map(Number));
  return { from, to } as Line;
});
const points: Set<number> = new Set();

const mark = (x: number, y: number) => {
  points[`${x},${y}`] = (points[`${x},${y}`] || 0) + 1;
};

const getDirection = (a: number, b: number) => {
  return a === b ? 0 : a < b ? 1 : -1;
};

for (const line of lines) {
  let [i, j] = line.from;
  const iDirection = getDirection(i, line.to[0]);
  const jDirection = getDirection(j, line.to[1]);
  if (iDirection === 0 || jDirection === 0) {
    while (i !== line.to[0] || j !== line.to[1]) {
      mark(i, j);
      i += iDirection;
      j += jDirection;
    }
    mark(line.to[0], line.to[1]);
  }
}

const result = Object.values(points).filter((x) => x > 1).length;

console.log(result);
