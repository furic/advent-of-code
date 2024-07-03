import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split("\n");

const hailstones = [];
const velocities = [ {}, {}, {} ];

for (const line of input) {
		const [position, velocity] = line.split(" @ ").map(x => x.split(", ").map(y => Number(y)));
		velocities[0][velocity[0]] ??= [];
		velocities[0][velocity[0]].push(position[0]);
		velocities[1][velocity[1]] ??= [];
		velocities[1][velocity[1]].push(position[1]);
		velocities[2][velocity[2]] ??= [];
		velocities[2][velocity[2]].push(position[2]);
		hailstones.push([position, velocity]);
}

// assuming nanosecond is the smallest time unit, and all collisions happen in a integer of nanosecond
// we can get the velocity of the rock, that it can reach the position of each hailstones
// by keeping the velocity that hailstones offset are divisible by the relative velocity
const rockVelocity = velocities.map(v => {
		const possibleVelocity = Array(2001).fill(0).map((_, i) => i - 1000); // [-1000, ..., 1000]
		for (const velocity of Object.keys(v)) {
				const positions = v[velocity];
				if (positions.length < 2) { // only 1 hailstone in this position
						continue;
				}
				const newPossibleVelocity = possibleVelocity.filter(x => (positions[0] - positions[1]) % (x - velocity) === 0);
				possibleVelocity.splice(0, possibleVelocity.length, ...newPossibleVelocity);
		}
		return possibleVelocity[0];
});

const results = {};

for (let i = 0; i < hailstones.length; i++) {
		for (let j = i + 1; j < hailstones.length; j++) {
				const h1 = hailstones[i];
				const h2 = hailstones[j];
				// (pxr - px0) / (vx0 - vxr) = (pyr - py0) / (vy0 - vyr)
				// (pxr - px0) / (vx0 - vxr) = (pzr - pz0) / (vz0 - vzr)
				// (vy1 - vyr) / (vx1 - vxr) ###Q1### = (pyr - py1) / (pxr - px1)
				// (vy2 - vyr) / (vx2 - vxr) ###Q2### = (pyr - py2) / (pxr - px2)
				// Q1 * (pxr - px1) - Q2 * (pxr - px2) = py2 - py1
				// pxr * (Q1 - Q2) + Q2 * px2 - Q1 * px1 = py2 - py1
				// pxr = (py2 - py1 - Q2 * px2 - Q1 * px1) / (Q1 - Q2)
				// etc...
				const quotient1 = (h1[1][1] - rockVelocity[1]) / (h1[1][0] - rockVelocity[0]);
				const quotient2 = (h2[1][1] - rockVelocity[1]) / (h2[1][0] - rockVelocity[0]);
				const rockX = Math.floor((h2[0][1] - (quotient2 * h2[0][0]) - h1[0][1] + (quotient1 * h1[0][0])) / (quotient1 - quotient2));
				const rockY = Math.floor(quotient1 * rockX + h1[0][1] - (quotient1 * h1[0][0]));
				const rockZ = h1[0][2] + (h1[1][2] - rockVelocity[2]) * Math.round((rockX - h1[0][0]) / (h1[1][0] - rockVelocity[0]));
				results[rockX + rockY + rockZ] ??= 0;
				results[rockX + rockY + rockZ]++;
		}
}

console.log(Object.keys(results).sort((a, b) => results[b] - results[a])[0]);