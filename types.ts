export type Point = { x: number; y: number };

export type PathFindingPoint = Point & { score?: number, isWall?: boolean };