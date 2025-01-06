import * as fs from 'fs';
import { parsePoint, pointToString } from '../../utils';

const [rawDots, rawInstructions] = fs.readFileSync('input', 'utf8').split('\n\n');

let dots = new Set(rawDots.split('\n'));
const instructions = rawInstructions.split('\n').map(line => {
	let [axis, number] = line.replace('fold along ', '').split('=');
	return { axis, number: Number(number) };
});

const fold = (repeat = 1) => {
	for (let i = 0; i < repeat; i++) {
		const instruction = instructions[i];
		const newDots = new Set<string>();
		for (const dot of dots) {
			let newDot = dot;
			const dotPosition = parsePoint(dot);
			if (dotPosition[instruction.axis] > instruction.number) {
				dotPosition[instruction.axis] = instruction.number * 2 - dotPosition[instruction.axis];
				newDot = pointToString(dotPosition);
			}
			newDots.add(newDot);
		}
		dots = newDots;
	}
}

fold();

console.log(dots.size);
