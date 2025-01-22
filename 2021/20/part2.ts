import * as fs from 'fs';
import { getNightNeighborsUnfiltered } from '../../utils';

const [algorithmString, imageString] = fs.readFileSync('input', 'utf8').split('\n\n');

let algorithm = algorithmString.split('').map((x) => (x === '#' ? 1 : 0));
let image = imageString.split('\n').map((line) => line.split('').map((x) => (x === '#' ? 1 : 0)));

const extend = () => {
	image = image.map((line) => [0, ...line, 0]);
	let emptyLine = new Array(image[0].length).fill(0);
	image = [emptyLine, ...image, emptyLine];
};

const enhance = () => {
	let newImage = image.map((row) => [...row]);
	for (let y = 0; y < image.length; y++) {
		for (let x = 0; x < image[0].length; x++) {
			const binary = getNightNeighborsUnfiltered(image, x, y)
				.map((n) => (n === undefined ? image[0][0] : n))
				.join('');
			newImage[y][x] = algorithm[parseInt(binary, 2)];
		}
	}
	image = newImage;
};

for (let i = 0; i < 50; i++) {
	extend();
}
for (let i = 0; i < 50; i++) {
	enhance();
}

const result = image.flat().filter(Boolean).length;

console.log(result);
