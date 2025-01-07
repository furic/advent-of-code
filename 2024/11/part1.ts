import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split(' ').map(Number);

const evolve = () => {
	for (let i = 0; i < input.length; i++) {
		if (input[i] === 0) {
			input[i] = 1;
		} else if (input[i].toString().length % 2 === 0) {
			const s = input[i].toString();
			const mid = s.length / 2;
			input[i] = Number(s.slice(mid));
			input.splice(i++, 0, Number(s.slice(0, mid)));
		} else {
			input[i] *= 2024;
		}
	}
};

for (let i = 0; i < 25; i++) {
	evolve();
}

console.log(input.length);
