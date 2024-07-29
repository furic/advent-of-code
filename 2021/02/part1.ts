import * as fs from "fs";

const input = fs
  .readFileSync("input", "utf8")
  .split("\n")
  .map((line) => {
    const [direction, value] = line.split(" ");
    return { direction, value: +value };
  });

let [x, y] = [0, 0];

for (const line of input) {
  switch (line.direction) {
    case "forward":
      x += line.value;
      break;
    case "down":
      y += line.value;
      break;
    case "up":
      y -= line.value;
      break;
  }
}

console.log(x * y);
