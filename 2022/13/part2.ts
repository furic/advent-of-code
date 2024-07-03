import * as fs from 'fs';

const input = fs.readFileSync("input", "utf8").split("\n").filter(x => x).map(x => JSON.parse(x));

const divider = [[[2]], [[6]]];

const check = (a, b) => {
		for (let i = 0; i < a.length && i < b.length; i++) {
				if (Number.isInteger(a[i]) && Number.isInteger(b[i])) {
						if (a[i] !== b[i]) {
								return a[i] - b[i];
						}
				} else {
						const result = check(
								Number.isInteger(a[i]) ? [a[i]] : a[i],
								Number.isInteger(b[i]) ? [b[i]] : b[i],
						);
						if (result !== 0) {
								return result;
						}
				}
		}
		return a.length - b.length;
};

const list = input.concat(divider).sort((a, b) => check(a, b));

const result = divider.map(x => list.indexOf(x) + 1).reduce((a, b) => a * b);

console.log(result);