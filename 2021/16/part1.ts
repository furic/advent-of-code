import * as fs from 'fs';

const input = fs
	.readFileSync('input', 'utf8')
	.split('')
	.map((n) => parseInt(n, 16).toString(2).padStart(4, '0').split(''))
	.flat();

const toNumber = (bits: string[]) => parseInt(bits.join(''), 2);
const shiftBits = (bits: string[], length: number) => bits.splice(0, length);
const shiftNumber = (bits: string[], length: number) => toNumber(shiftBits(bits, length));

const calculate = () => {
	let version = shiftNumber(input, 3);
	let typeId = shiftNumber(input, 3);

	if (typeId === 4) {
		let haveMore = 1;
		while (haveMore === 1) {
			haveMore = shiftNumber(input, 1);
			shiftBits(input, 4); // Skip literal value
		}
		return version;
	}

	let lengthTypeId = shiftNumber(input, 1);
	let subPackets = [];
	
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
	return version + subPackets.reduce((a, b) => a + b, 0);
};

const result = calculate();

console.log(result);
