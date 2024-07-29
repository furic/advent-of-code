import * as fs from "fs";

const input = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((line: string) => {
    const [x, y, z] = line.split(",").map((n) => +n);
    return { x, y, z };
  });

const getKey = (p) => `${p.x},${p.y},${p.z}`;

const checkExists = (point) => set.has(getKey(point));

const getNeighbors = ({ x, y, z }) => [
  { x: x - 1, y, z },
  { x: x + 1, y, z },
  { x, y: y - 1, z },
  { x, y: y + 1, z },
  { x, y, z: z - 1 },
  { x, y, z: z + 1 },
];

const isExterior = (point, cache: Set<string>) => {
  const visited = new Set(getKey(point));
  const queue = [point];

  while (queue.length > 0) {
    const next = queue.shift()!;
    if (cache.has(getKey(next)) || !isWithinLimits(next)) {
      visited.forEach((k) => cache.add(k));
      return true;
    }
    const neighbors = getNeighbors(next).filter((point) => {
      return !checkExists(point) && !visited.has(getKey(point));
    });
    neighbors.forEach((neighbor) => {
      visited.add(getKey(neighbor));
      queue.push(neighbor);
    });
  }
  return false;
};

const minX = Math.min(...input.map((p) => p.x));
const maxX = Math.max(...input.map((p) => p.x));
const minY = Math.min(...input.map((p) => p.y));
const maxY = Math.max(...input.map((p) => p.y));
const minZ = Math.min(...input.map((p) => p.z));
const maxZ = Math.max(...input.map((p) => p.z));

const isWithinLimits = ({ x, y, z }) =>
  minX <= x && maxX >= x && minY <= y && maxY >= y && minZ <= z && maxZ >= z;

const set = new Set(input.map(getKey));

let count = 0;
let cache = new Set<string>();
for (const cube of input) {
  const neighbors = getNeighbors(cube).filter((p) => !checkExists(p));
  neighbors.forEach((neighbor) => {
    if (isExterior(neighbor, cache)) {
      count++;
    }
  });
}

console.log(count);
