import * as fs from 'fs';

const points = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(',').map(Number));

type Rectangle = {
	top: number;
	left: number;
	bottom: number;
	right: number;
};

// Create rectangle from two points
const rectangleFromPoints = (p1: number[], p2: number[]): Rectangle => {
	const top = Math.min(p1[1], p2[1]);
	const bottom = Math.max(p1[1], p2[1]);
	const left = Math.min(p1[0], p2[0]);
	const right = Math.max(p1[0], p2[0]);
	return { top, left, bottom, right };
};

// Calculate area of rectangle (inclusive)
const area = (r: Rectangle): number => (r.bottom - r.top + 1) * (r.right - r.left + 1);

// AABB collision detection
// See https://kishimotostudios.com/articles/aabb_collision/
const aabbCollision = (a: Rectangle, b: Rectangle): boolean => {
	const aIsToTheLeft = a.right <= b.left;
	const aIsToTheRight = a.left >= b.right;
	const aIsAbove = a.bottom <= b.top;
	const aIsBelow = a.top >= b.bottom;
	return !(aIsToTheRight || aIsToTheLeft || aIsAbove || aIsBelow);
};

// Get boundary segments (edges of the polygon)
const boundary = (corners: number[][]): Rectangle[] => {
	const segments: Rectangle[] = [];
	for (let i = 0; i < corners.length; i++) {
		const p1 = corners[i];
		const p2 = corners[(i + 1) % corners.length];
		segments.push(rectangleFromPoints(p1, p2));
	}
	return segments;
};

// Generate all rectangles ordered by area (descending)
const rectanglesOrderedByArea = (pts: number[][]): Rectangle[] => {
	const rectangles: Rectangle[] = [];
	for (const p1 of pts) {
		for (const p2 of pts) {
			rectangles.push(rectangleFromPoints(p1, p2));
		}
	}
	rectangles.sort((a, b) => area(b) - area(a));
	return rectangles;
};

// Part 2: Find first (largest) rectangle that doesn't collide with any boundary segment
const segments = boundary(points);
const rectangles = rectanglesOrderedByArea(points);

for (const rect of rectangles) {
	if (segments.every((seg) => !aabbCollision(rect, seg))) {
		console.log(area(rect));
		break;
	}
}
