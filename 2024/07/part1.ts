import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map(line => line.split(': '));
const testValues = input.map(item => Number(item[0]));
const equationValues = input.map(item => item[1].split(' ').map(Number));

const checkEquation = (testValue: number, current: number, equationValues: number[]): boolean => {
    if (current > testValue) return false;
    const plusResult = current + equationValues[0];
    const multipleResult = current * equationValues[0];
    if (equationValues.length === 1) {
        return plusResult === testValue || multipleResult === testValue;
    }
    const newEquationValues = equationValues.slice(1);
    return checkEquation(testValue, plusResult, newEquationValues) || checkEquation(testValue, multipleResult, newEquationValues);
};

let result = 0;
for (let i = 0; i < testValues.length; i++) {
    if (checkEquation(testValues[i], equationValues[i][0], equationValues[i].slice(1))) {
        result += testValues[i];
    }
}

console.log(result);