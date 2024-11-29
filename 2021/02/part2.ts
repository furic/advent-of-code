import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n')
	.map((line) => {
		const [direction, value] = line.split(' ');
		return { direction, value: +value };
	});

let [x, y, aim] = [0, 0, 0];

for (const line of input) {
	switch (line.direction) {
		case 'forward':
			x += line.value;
			y += aim * line.value;
			break;
		case 'down':
			aim += line.value;
			break;
		case 'up':
			aim -= line.value;
			break;
	}
}

console.log(x * y);
