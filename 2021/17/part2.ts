import * as fs from 'fs';

const [minX, maxX, minY, maxY] = fs.readFileSync('input', 'utf8').match(/-?\d+/g).map(Number);

const shoot = (vx: number, vy: number) => {
	let [x, y] = [0, 0];
	while (x < maxX && y > minY) {
		x += vx;
		y += vy;
		if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
			return true;
		}
		vx = Math.max(0, vx - 1);
		vy--;
	}
	return false;
};

let result = 0;
for (let vx = 0; vx <= maxX; vx++) {
	for (let vy = minY; vy <= Math.abs(minY); vy++) {
		result += shoot(vx, vy) ? 1 : 0;
	}
}

console.log(result);
