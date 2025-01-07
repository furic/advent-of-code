import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n').map(Number);

const hashRepeats = 2000;

const hash = (n: number) => {
	n = (n ^ (n * 64)) & 16777215;
	n = (n ^ (n / 32)) & 16777215;
	return (n ^ (n * 2048)) & 16777215;
};

let secrets: number[] = [...input];
for (let i = 0; i < hashRepeats; i++) {
	secrets = secrets.map(hash);
}

const result = secrets.reduce((a, b) => a + b, 0);

console.log(result);
