import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('\n\n')
	.map((block) => {
		const [rawA, rawB, rawPrize] = block.split('\n');
		const [, xA, yA] = rawA.match(/X\+(\d+), Y\+(\d+)/);
		const [, xB, yB] = rawB.match(/X\+(\d+), Y\+(\d+)/);
		const [, xPrize, yPrize] = rawPrize.match(/X=(\d+), Y=(\d+)/);
		return {
			xA: Number(xA),
			yA: Number(yA),
			xB: Number(xB),
			yB: Number(yB),
			xPrize: Number(xPrize),
			yPrize: Number(yPrize),
		};
	});

// xPrize = countA * xA + countB * xB
// yPrize = countA * yA + countB * yB
// --
// countB = (xPrize - countA * xA) / xB
// --
// yPrize = countA * yA + (xPrize - countA * xA) / xB * yB
// yPrize = countA * yA + xPrize * yB / xB - countA * xA * yB / xB
// countA = (yPrize - xPrize * yB / xB) / (yA - xA * yB / xB)
// countA = (yPrize * xB - xPrize * yB) / (yA * xB - xA * yB)
const solve = ({ xA, yA, xB, yB, xPrize, yPrize }) => {
	const countA = (yPrize * xB - xPrize * yB) / (yA * xB - xA * yB);
	const countB = (xPrize - countA * xA) / xB;
	if (Math.floor(countA) === countA && Math.floor(countB) === countB) {
		return countA * 3 + countB;
	}
	return 0;
};

let result = input.map(solve).reduce((a, b) => a + b, 0);

console.log(result);
