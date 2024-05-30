import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8");

const DIRECTION_MAP = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 }
];
const DICE_SQUARES = [
  { x: 50, y: 0, wrap: [null, null, [4, 0], [5, 0]] },
  { x: 100, y: 0, wrap: [[3, 2], [2, 2], null, [5, 3]] },
  { x: 50, y: 50, wrap: [[1, 3], null, [4, 1], null] },
  { x: 50, y: 100, wrap: [[1, 2], [5, 2], null, null] },
  { x: 0, y: 100, wrap: [null, null, [0, 0], [2, 0]] },
  { x: 0, y: 150, wrap: [[3, 3], [1, 1], [0, 1], null] },
];
const DICE_WIDTH = 50;

const walk = (pos: { x: number, y: number, direction: number }, steps: number) => {
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

const wrap = (pos: { x: number, y: number, direction: number }): { x: number, y: number, direction: number } => {
  const offset = { x: pos.x % DICE_WIDTH, y: pos.y % DICE_WIDTH };
  const mirror = { x: DICE_WIDTH - offset.x - 1, y: DICE_WIDTH - offset.y - 1 };

  const diceSquare = DICE_SQUARES.find(
    dice => dice.x === pos.x - offset.x && dice.y === pos.y - offset.y,
  );
  const diceWrap = diceSquare?.wrap[pos.direction];
  const [i, direction] = diceWrap!;

  const pair = [pos.direction, direction].sort().join('');
  let next;
  if (['02', '11', '33'].includes(pair)) next = { x: offset.x, y: mirror.y };
  if (['00', '13', '22'].includes(pair)) next = { x: mirror.x, y: offset.y };
  if (['03', '12'].includes(pair)) next = { x: offset.y, y: offset.x };
  if (['01', '23'].includes(pair)) next = { x: mirror.y, y: mirror.x };
  return { x: DICE_SQUARES[i].x + next!.x, y: DICE_SQUARES[i].y + next!.y, direction };
};

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