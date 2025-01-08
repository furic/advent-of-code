import * as fs from 'fs';

const [minX, maxX, minY, maxY] = fs.readFileSync('input', 'utf8').match(/-?\d+/g).map(Number);

const shoot = (vx: number, vy: number) => {
	let [x, y, topY] = [0, 0, 0];
	while (x < maxX && y > minY) {
		x += vx;
		y += vy;
		topY = Math.max(topY, y);
		if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
			return topY;
		}
		vx = Math.max(0, vx - 1);
		vy--;
	}
	return -1;
};

let result = 0;
for (let vx = 0; vx <= maxX; vx++) {
	for (let vy = minY; vy <= Math.abs(minY); vy++) {
		result = Math.max(result, shoot(vx, vy));
	}
}

console.log(result);
