import * as fs from 'fs';
const input = fs.readFileSync('input', 'utf8').split('\n');

const cardMap = {
	J: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	T: 10,
	Q: 11,
	K: 12,
	A: 13,
};

const fiveOfAKind = [];
const fourOfAKind = [];
const fullHouse = [];
const threeOfAKind = [];
const twoPairs = [];
const onePair = [];
const highCard = [];

for (const line of input) {
	const cardBet = [line.split(' ')[0], Number(line.split(' ')[1])];

	const chars = {};
	for (const char of cardBet[0]) {
		chars[char] === undefined ? (chars[char] = 1) : chars[char]++;
	}

	let keys = Object.keys(chars);
	let values = Object.values(chars);

	if (chars['J'] < 5) {
		// console.log('before:', keys, values);
		const jCount = chars['J'];
		delete chars['J'];
		const max = Math.max(...Object.values(chars));
		keys = Object.keys(chars);
		values = Object.values(chars);
		chars[keys[values.findIndex((x) => x === max)]] += jCount;
		values = Object.values(chars);
		// console.log('after:', keys, values);
	}

	if (keys.length == 1) {
		fiveOfAKind.push(cardBet);
	} else if (keys.length == 2) {
		if (values.includes(4)) fourOfAKind.push(cardBet);
		else fullHouse.push(cardBet);
	} else if (keys.length == 3) {
		if (values.includes(3)) threeOfAKind.push(cardBet);
		else twoPairs.push(cardBet);
	} else if (keys.length == 4) {
		onePair.push(cardBet);
	} else {
		highCard.push(cardBet);
	}
}

function sortCards(a, b) {
	if (cardMap[a[0][0]] != cardMap[b[0][0]]) return cardMap[a[0][0]] - cardMap[b[0][0]];
	else if (cardMap[a[0][1]] != cardMap[b[0][1]]) return cardMap[a[0][1]] - cardMap[b[0][1]];
	else if (cardMap[a[0][2]] != cardMap[b[0][2]]) return cardMap[a[0][2]] - cardMap[b[0][2]];
	else if (cardMap[a[0][3]] != cardMap[b[0][3]]) return cardMap[a[0][3]] - cardMap[b[0][3]];
	else if (cardMap[a[0][4]] != cardMap[b[0][4]]) return cardMap[a[0][4]] - cardMap[b[0][4]];
	else return 0;
}

fiveOfAKind.sort(sortCards);
fourOfAKind.sort(sortCards);
fullHouse.sort(sortCards);
threeOfAKind.sort(sortCards);
twoPairs.sort(sortCards);
onePair.sort(sortCards);
highCard.sort(sortCards);

const resultArray = [
	...highCard,
	...onePair,
	...twoPairs,
	...threeOfAKind,
	...fullHouse,
	...fourOfAKind,
	...fiveOfAKind,
];
console.log(resultArray.reduce((a, x, i) => a + x[1] * (i + 1), 0));
