const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split('\n');

const getOptions = (check, key): string[] => {
  const [x, y] = key.split(',').map(n => Number(n));
  if (check === 'N') return [x, x - 1, x + 1].map(x => `${x},${y - 1}`);
  if (check === 'S') return [x, x - 1, x + 1].map(x => `${x},${y + 1}`);
  if (check === 'W') return [y, y - 1, y + 1].map(y => `${x - 1},${y}`);
  if (check === 'E') return [y, y - 1, y + 1].map(y => `${x + 1},${y}`);
}

const move = (elves, proposals): void => {
  for (const key of proposals.keys()) {
    const moving = proposals.get(key);
    if (moving.length === 1) {
      elves.delete(moving[0]);
      elves.add(key);
    }
  }
}

const round = (elves, checks): void => {
  const proposals = new Map();
  for (const key of elves.keys()) {
    const all = checks.flatMap(check => getOptions(check, key));
    if (all.every(option => !elves.has(option))) { // do nothing if no other Elves in surrounding
      continue;
    }
    for (const check of checks) {
      const options = getOptions(check, key);
      if (options.every(option => !elves.has(option))) {
        const decision = options[0];
        proposals.set(decision, (proposals.get(decision) || []).concat(key));
        break;
      }
    }
  }
  checks.push(checks.shift());
  move(elves, proposals);
}

const checks = ['N', 'S', 'W', 'E'];
const elves = new Set<string>();
input.forEach((line, y) =>
  line.split('').forEach((cell, x) => {
    if (cell === '#') {
      elves.add(`${x},${y}`);
    }
  }),
);

for (let i = 0; i < 10; i++) {
  round(elves, checks);
}
const keys = [...elves.keys()].map(key => key.split(','));
const xs = keys.map(key => +key[0]).sort((a, b) => b - a);
const ys = keys.map(key => +key[1]).sort((a, b) => b - a);

const result = (xs.at(0) - xs.at(-1) + 1) * (ys.at(0) - ys.at(-1) + 1) - elves.size;

console.log(result);