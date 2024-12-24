import * as fs from 'fs';

const [wiresString, gatesString] = fs.readFileSync('input', 'utf8').split('\n\n');

const wiresMap = new Map();
wiresString.split("\n").forEach(line => {
	let [name, value] = line.split(": ");
	wiresMap.set(name, Number(value));
});
const gates = gatesString.split("\n").map(line => {
	let [input1, operate, input2, , output] = line.split(" ");
	return { input1, operate, input2, output };
});

let completed = false;
while (!completed) {
	completed = true;
	gates.forEach(({ input1, operate, input2, output }) => {
		let inputValue1 = wiresMap.get(input1);
		let inputValue2 = wiresMap.get(input2);
		if (inputValue1 !== undefined && inputValue2 !== undefined) {
			switch (operate) {
				case "AND":
					wiresMap.set(output, inputValue1 & inputValue2);
					break;
				case "OR":
					wiresMap.set(output, inputValue1 | inputValue2);
					break;
				case "XOR":
					wiresMap.set(output, inputValue1 ^ inputValue2);
					break;
			}
		} else {
			completed = false;
		}
	});
}

const zWires = [
	...Array.from(wiresMap.entries()).filter(([wire]) => wire.startsWith('z')),
];
const result = zWires
	.sort((a, b) => b[0].localeCompare(a[0]))
	.map(x => x[1])
	.join("");

console.log(parseInt(result, 2));