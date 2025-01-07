import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('')
	.flatMap((n) => parseInt(n, 16).toString(2).padStart(4, '0').split(''));

const toNumber = (bits: string[]) => parseInt(bits.join(''), 2);
const shiftBits = (bits: string[], length: number) => bits.splice(0, length);
const shiftNumber = (bits: string[], length: number) => toNumber(shiftBits(bits, length));

const calculate = () => {
	shiftNumber(input, 3); // Skip version
	let typeId = shiftNumber(input, 3);

	if (typeId === 4) {
		const numberBits = [];
		while (shiftNumber(input, 1)) {
			numberBits.push(...shiftBits(input, 4));
		}
		numberBits.push(...shiftBits(input, 4));
		return toNumber(numberBits);
	}

	let lengthTypeId = shiftNumber(input, 1);
	let subPackets: number[] = [];

	if (lengthTypeId === 1) {
		const packetsCount = shiftNumber(input, 11);
		for (let i = 0; i < packetsCount; i++) {
			subPackets.push(calculate());
		}
	} else {
		const packetsLength = shiftNumber(input, 15);
		const targetLength = input.length - packetsLength;
		while (input.length !== targetLength) {
			subPackets.push(calculate());
		}
	}
	return [
		() => subPackets.reduce((a, b) => a + b, 0),
		() => subPackets.reduce((a, b) => a * b, 1),
		() => Math.min(...subPackets),
		() => Math.max(...subPackets),
		() => 0, // Unused (typeId=4)
		() => Number(subPackets[0] > subPackets[1]),
		() => Number(subPackets[0] < subPackets[1]),
		() => Number(subPackets[0] === subPackets[1]),
	][typeId]();
};

const result = calculate();

console.log(result);
