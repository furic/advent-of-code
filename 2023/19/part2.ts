import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n\n")[0].split("\n");

const workflows = {};

for (const line of input) {
		const info = line.split("{");
		workflows[info[0]] = info[1].slice(0, -1).split(",").map(x => {
				if (x.includes(">")) {
						const [category, value] = x.split(">").map((x, i) => i == 1 ? Number(x.split(":")[0]) : "xmas".indexOf(x));
						return [category, ">", value, x.split(":")[1]];
				} else if (x.includes("<")) {
						const [category, value] = x.split("<").map((x, i) => i == 1 ? Number(x.split(":")[0]) : "xmas".indexOf(x));
						return [category, "<", value, x.split(":")[1]];
				}
				else return x;
		});
}

let result = 0;

const queue = [["in", [[1, 4000], [1, 4000], [1, 4000], [1, 4000]]]];
while (queue.length > 0) {
		const [workflow, intervals] = queue.pop();
		if (workflow == "A" || workflow == "R") {
				if (workflow == "A") {
						result += intervals.reduce((a, b) => a * (b[1] - b[0] + 1), 1);
				}
				continue;
		}

		for (const [left, op, right, then] of workflows[workflow].slice(0, -1)) {
				const [low, high] = intervals[left];

				if ((op == ">" && right >= high) || (op == "<" && right <= low)) continue;
				if ((op == ">" && right < low) || (op == "<" && right > high)) {
						queue.push([then, intervals]);
						break;
				}

				intervals[left] = [op == ">" ? low : right, op == ">" ? right : high];
				const newIntervals = [...intervals];
				newIntervals[left] = [op == ">" ? right + 1 : low, op == ">" ? high : right - 1];
				queue.push([then, newIntervals]);
		}

		queue.push([workflows[workflow].slice(-1)[0], intervals]);
}

console.log(result);