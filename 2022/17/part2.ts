import * as fs from "fs";

const input = fs.readFileSync("input", "utf8");

type Point = { x: number; y: number };
type Stream = { input: string; index: number };
type Memory = { snapshot: string; height: number; index: number };

const rocks = 1000000000000;

const shapes = [
  ["####"],
  [".#.", "###", ".#."],
  ["..#", "..#", "###"],
  ["#", "#", "#", "#"],
  ["##", "##"],
].map((shape) => {
  const cells = [];
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] === "#") {
        cells.push({ x, y } as Point);
      }
    }
  }
  return { cells, shapeHeight: shape.length };
});
const stream: Stream = { input, index: 0 };
const cave: string[][] = [];

const drop = (cave: string[][], cells: Point[], stream: Stream) => {
  const pos = { x: 2, y: 0 };
  let settled = false;
  while (!settled) {
    const direction = stream.input[stream.index++ % stream.input.length];
    move(cave, pos, cells, { x: direction === "<" ? -1 : 1, y: 0 } as Point);
    if (!move(cave, pos, cells, { x: 0, y: 1 })) {
      cells.forEach((cell) => (cave[pos.y + cell.y][pos.x + cell.x] = "#"));
      settled = true;
    }
  }
  return pos.y;
};
const move = (cave: string[][], pos: Point, cells: Point[], offset: Point) => {
  const next = { x: pos.x + offset.x, y: pos.y + offset.y };
  if (cells.every((cell) => cave[next.y + cell.y]?.[next.x + cell.x] === ".")) {
    pos.x += offset.x;
    pos.y += offset.y;
    return true;
  }
  return false;
};
const detectRepeat = (
  cave: string[][],
  height: number,
  memory: Memory[],
  window: number,
) => {
  const snapshot = JSON.stringify(cave.slice(0, window));
  const found = memory.filter((s) => s.snapshot === snapshot);
  if (found.length === 2) {
    return {
      indexDiff: found[1].index - found[0].index,
      heightDiff: found[1].height - found[0].height,
    };
  } else {
    memory.push({ snapshot, height, index: memory.length } as Memory);
  }
};

let memory: Memory[] = [];
let depth = 0;
let height = 0;

for (let i = 0; i < rocks; i++) {
  const { cells, shapeHeight } = shapes[i % shapes.length];
  while (depth < height + shapeHeight + 3) {
    cave.unshift(new Array(7).fill("."));
    depth++;
  }
  while (depth > height + shapeHeight + 3) {
    cave.shift();
    depth--;
  }
  const loop = memory && detectRepeat(cave, height, memory, 100);
  if (loop) {
    const mul = Math.floor((rocks - i) / loop.indexDiff);
    i += mul * loop.indexDiff;
    depth += mul * loop.heightDiff;
    height += mul * loop.heightDiff;
    memory = []; // no more detectRepeat
  }
  const y = drop(cave, cells, stream);
  height = Math.max(height, depth - y);
}

console.log(height);
