const fs = require("fs");
const input = fs.readFileSync("input", "utf8");

const walk = (pos, steps) => {
  for (; steps > 0; steps--) {
    const heading = DIRECTION_MAP[pos.direction];
    let next = { ...pos };
    next.x += heading.x;
    next.y += heading.y;
    if (maze[next.y]?.[next.x] !== '.' && maze[next.y]?.[next.x] !== '#') {
      next = wrap(pos);
    }
    if (maze[next.y][next.x] === '#') {
      break;
    }
    pos = next;
  }
  return pos;
}

const wrap = (pos) => {
  const heading = DIRECTION_MAP[pos.direction];
  const opposite = { x: heading.x * -1, y: heading.y * -1 };
  const wrap = { ...pos };
  while (
    maze[wrap.y + opposite.y]?.[wrap.x + opposite.x] === '.' ||
    maze[wrap.y + opposite.y]?.[wrap.x + opposite.x] === '#'
  ) {
    wrap.x += opposite.x;
    wrap.y += opposite.y;
  }
  return wrap;
};

const DIRECTION_MAP = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 }
];

let [maze, directions] = input.split('\n\n');
let pos = { x: 0, y: 0, direction: 0 };
maze = maze.split('\n');

directions = directions.replace(/(R|L)/g, ',$1,').split(',');
while (maze[pos.y][pos.x] !== '.') {
  pos.x++;
}
while (directions.length > 0) {
  const next = directions.shift();
  if (next === 'R') {
    pos.direction = (pos.direction + 1) % 4;
  } else if (next === 'L') {
    pos.direction = (4 + pos.direction - 1) % 4;
  } else if (Number.isInteger(+next)) {
    pos = walk(pos, +next);
  }
}

const result = (pos.y + 1) * 1000 + (pos.x + 1) * 4 + pos.direction;

console.log(result);