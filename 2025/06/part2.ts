import * as fs from 'fs';

const lines = fs.readFileSync('input', 'utf8').split('\n');

/**
 * Parses a column to extract the number (reading top-to-bottom, excluding operators)
 */
const parseColumn = (colIndex: number): string => {
	return lines
		.map((line) => line[colIndex])
		.join('')
		.replace(/[+*]/, '')
		.trim();
};

/**
 * Gets the operator from the bottom row of a column
 */
const getOperator = (colIndex: number): string => {
	return lines[lines.length - 1][colIndex];
};

let grandTotal = 0;
let currentOp = '';
let currentResult = 0;

// Process columns from left to right
for (let col = 0; col < lines[0].length; col++) {
	// Start of new problem - read operator
	if (currentOp === '') {
		currentOp = getOperator(col);
		currentResult = currentOp === '+' ? 0 : 1;
	}

	const digits = parseColumn(col);

	// Empty column means end of current problem
	if (digits === '') {
		grandTotal += currentResult;
		currentOp = '';
		continue;
	}

	// Apply operation
	const number = parseInt(digits, 10);
	if (currentOp === '+') {
		currentResult += number;
	} else {
		currentResult *= number;
	}
}

// Add the last problem's result
grandTotal += currentResult;

console.log(grandTotal);
