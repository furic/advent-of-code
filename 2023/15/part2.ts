import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split(",").map(x => x.split(/=|-/)).map(x => [x[0], Number(x[1])]);

const lenses = {};
const boxes = Array(256).fill(0).map(() => []);
const hashMap = {};

for (const [label, focalLength] of input) {
		lenses[label] ??= {};
		hashMap[label] ??= label.split("").map(x => x.charCodeAt(0)).reduce((a, b) => 17 * (a + b) % 256, 0);
		const boxIndex = hashMap[label];
		const lensIndex = boxes[boxIndex].findIndex(x => x[0] === label);
		if (focalLength > 0) { // =
				lenses[label].box = boxIndex;
				lenses[label].focalLength = focalLength;
				if (lensIndex >= 0) {
						boxes[boxIndex][lensIndex][1] = focalLength;
				} else {
						boxes[boxIndex].push([label, focalLength]);
				}
		} else { // -
				delete lenses[label];
				if (lensIndex >= 0) {
						boxes[boxIndex].splice(lensIndex, 1);
				}
		}
}

let result = 0;

for (const [label, info] of Object.entries(lenses)) {
		result += (info.box + 1) * info.focalLength * (boxes[hashMap[label]].findIndex(x => x[0] === label) + 1);
}

console.log(result);