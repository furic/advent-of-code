import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map(Number);

const hashRepeats = 2000;

const hash = (n: number) => {
	n = (n ^ (n * 64)) & 16777215;
	n = (n ^ (n / 32)) & 16777215;
	return (n ^ (n * 2048)) & 16777215;
};

let secrets: number[] = [...input];
let diffs = input.map(() => []);
let cache = new Map();
let result = 0;

for (let i = 0; i < hashRepeats; i++) {
	secrets = secrets.map((secret, j) => {
		let newSecret = hash(secret);
		diffs[j].push(Number((newSecret % 10) - (secret % 10)));

		if (diffs[j].length === 4) {
			let key = diffs[j].join(',');
			let value = cache.get(key) || { sum: 0, set: new Set() };

			if (!value.set.has(j)) {
				value.set.add(j);
				value.sum += Number(newSecret % 10);
				result = Math.max(result, value.sum);
			}

			cache.set(key, value);
			diffs[j].shift();
		}
		return newSecret;
	});
}

console.log(result);
