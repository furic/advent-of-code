import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const robots = 2;

const createPadMap = (padMap: string[][]): Map<string, { x: number, y: number }> => {
	const map: Map<string, { x: number, y: number }> = new Map;
	padMap.map((row, y) => row.map((key, x) => (map[key] = { x, y })));
	return map;
}

const keyPadMap = createPadMap([['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], [' ', '0', 'A']]);
const arrowPadMap = createPadMap([[' ', '^', 'A'], ['<', 'v', '>']]);

const memory = new Map<string, number>();

const type = (code: string, robotCount: number, isHuman = false) => {
	if (robotCount === 0)
		return code.length;

	const memoryKey = `${code},${robotCount}`;
	if (memory.has(memoryKey))
		return memory.get(memoryKey);

	let padMap = isHuman ? keyPadMap : arrowPadMap;
	let from = padMap["A"];
	let pushCount = 0;

	for (let button of code) {
		const to = padMap[button];
		const queue = [{ ...from, pushes: '' }];
		let min = Infinity;

		while (queue.length) {
			const { x, y, pushes } = queue.shift();
			if (x === padMap[' '].x && y === padMap[' '].y)
				continue;
			if (x === to.x && y === to.y) {
				min = Math.min(min, type(`${pushes}A`, isHuman ? robotCount : robotCount - 1));
			}
			if (to.x > x) queue.push({ x: x + 1, y, pushes: `${pushes}>` });
			if (to.x < x) queue.push({ x: x - 1, y, pushes: `${pushes}<` });
			if (to.y > y) queue.push({ x, y: y + 1, pushes: `${pushes}v` });
			if (to.y < y) queue.push({ x, y: y - 1, pushes: `${pushes}^` });
		}
		pushCount += min;
		from = to;
	}
	memory.set(memoryKey, pushCount);
	return pushCount;
}

const result = input.map(code => parseInt(code) * type(code, robots, true)).reduce((a, b) => a + b, 0);

console.log(result);