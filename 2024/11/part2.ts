import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split(' ').map(Number);

const evolveMap = new Map<string, number>();

const evolve = (value: number) => {
	if (value === 0) return [1];
	if (value.toString().length % 2 === 0) {
		const s = value.toString();
		const mid = s.length / 2;
		return [Number(s.slice(0, mid)), Number(s.slice(mid))];
	}
	return [value * 2024];
};

const getEvolvedTotal = (value: number, repeat: number) => {
	if (repeat === 0) return 1;

	const key = `${value},${repeat}`;
	if (evolveMap.has(key)) return evolveMap.get(key);

	const values = evolve(value);
	const total = values.reduce((acc, v) => acc + getEvolvedTotal(v, repeat - 1), 0);

	evolveMap.set(key, total);
	return total;
};

const result = input.reduce((acc, value) => acc + getEvolvedTotal(value, 75), 0);

console.log(result);
