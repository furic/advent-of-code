import * as fs from 'fs';

interface Region {
  width: number;
  length: number;
  shapes: number[];
}

function couldFit(region: Region, shapes: Map<number, Set<string>>): boolean {
  const totalSpace = region.width * region.length;
  const requiredSpace = region.shapes.reduce(
    (sum, count, shapeIdx) => sum + count * (shapes.get(shapeIdx)?.size || 0),
    0
  );
  return totalSpace >= requiredSpace;
}

const input = fs.readFileSync('input', 'utf8');
const shapes = new Map<number, Set<string>>();
const regions: Region[] = [];
const blocks = input.trim().split('\n\n');

for (const block of blocks) {
  const lines = block.split('\n');

  if (lines[0].endsWith(':')) {
    // Parse shape
    const idx = parseInt(lines[0].slice(0, -1));
    shapes.set(idx, new Set());

    for (let r = 0; r < lines.length - 1; r++) {
      const line = lines[r + 1];
      for (let c = 0; c < line.length; c++) {
        if (line[c] === '#') {
          shapes.get(idx)!.add(`${r},${c}`);
        }
      }
    }
  } else {
    // Parse region
    for (const line of lines) {
      const digits = line.match(/\d+/g);
      if (digits && digits.length >= 2) {
        regions.push({
          width: parseInt(digits[0]),
          length: parseInt(digits[1]),
          shapes: digits.slice(2).map(Number),
        });
      }
    }
  }
}

const result = regions.filter(region => couldFit(region, shapes)).length;
console.log(result);
