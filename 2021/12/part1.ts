import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const connections = {};
input.forEach(x => {
	const [src, dest] = x.split("-");
	connections[src] = (connections[src] || []).concat(dest);
	connections[dest] = (connections[dest] || []).concat(src);
});

let result = 0;
const queue = [{ point: "start", path: ["start"] }];

while (queue.length > 0) {
	const { point, path } = queue.shift();
	if (point === "end") {
		result++;
	} else {
		connections[point].forEach((neighbor: string) => {
			if (neighbor !== "start" && (neighbor.toUpperCase() === neighbor || !path.includes(neighbor))) {
				queue.push({ point: neighbor, path: [...path, neighbor] });
			}
		});

	}
}

console.log(result);
