import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n").map(x => x.split(""));

const rows = input.length;
const columns = input[0].length;
const invalidDirections = ["^v", "v^", "<>", "><"];
const visitedPositions = { "1,0^": new Set(["1,0"]) };
const neighbors = { "0,1": [1, 1] };
neighbors[[rows - 1,columns - 2].join(",")] = [rows - 2, columns - 2];

for (let i = 1; i < rows - 1; i++) { // skip first row
		for (let j = 1; j < columns - 1; j++) { // skip first column
				if (input[i][j] === "#") {
						continue;
				}
				const neighbor = [];
				if (input[i - 1][j] !== "#") neighbor.push([i - 1, j, "^"]);
				if (input[i + 1][j] !== "#") neighbor.push([i + 1, j, "v"]);
				if (input[i][j - 1] !== "#") neighbor.push([i, j - 1, "<"]);
				if (input[i][j + 1] !== "#") neighbor.push([i, j + 1, ">"]);
				neighbors[[i, j].join(",")] = neighbor;
		}
}

let result = 0;

function walk(row, col, visited, direction) {
		if (row === rows - 1 && col === columns - 2) { // endpoint
				result = Math.max(result, visited.size);
				return;
		}
		const position = [row, col].join(",");
		const key = position + direction;
		if (!Array.isArray(neighbors[position][0]) && key in visitedPositions && [...visited].every(v => visitedPositions[key].has(v))) {
				return;
		}
		if (invalidDirections.includes(direction + input[row][col])) {
				return;
		}
		visited.add(position);
		visitedPositions[key] = new Set(visited);
		for (const [coordRow, coordCol, dir] of neighbors[position]) {
				if (!visited.has([coordRow, coordCol].join(","))) {
						walk(coordRow, coordCol, new Set(visited), dir);
				}
		}
}

walk(1, 1, new Set(["0,1"]), "v");

console.log(result);