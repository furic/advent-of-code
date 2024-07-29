import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

let result = 0;

for (const line of input) {
	const id = Number(line.split(': ')[0].split('Game ')[1]);
	const game = line
		.split(': ')[1]
		.split('; ')
		.map((x) => {
			const result = {
				red: 0,
				green: 0,
				blue: 0,
			};
			const objects = x.split(', ');
			for (const object of objects) {
				if (object.endsWith('red')) result.red = Number(object.split(' ')[0]);
				if (object.endsWith('green')) result.green = Number(object.split(' ')[0]);
				if (object.endsWith('blue')) result.blue = Number(object.split(' ')[0]);
			}

			return result;
		});
	const redMax = Math.max(...game.map((x) => x.red));
	const greenMax = Math.max(...game.map((x) => x.green));
	const blueMax = Math.max(...game.map((x) => x.blue));
	if (redMax <= 12 && greenMax <= 13 && blueMax <= 14) result += id;
}

console.log(result);
