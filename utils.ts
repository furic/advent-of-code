import type { Point } from "./types";
import { ORTHOGONAL_DIRECTIONS } from "./constants";

export const getNeighbors = <T>(input: T[][], arg1: number | Point, arg2?: number): T[] => {
    let x: number, y: number;
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        x = arg1;
        y = arg2;
    } else if (typeof arg1 === 'object') {
        x = arg1.x;
        y = arg1.y;
    } else {
        throw new Error("Invalid arguments");
    }
    return ORTHOGONAL_DIRECTIONS
        .map((direction) => input[y + direction.y]?.[x + direction.x])
        .filter(n => n !== undefined);
}

export const getNeighborPositions = <T>(input: T[][], arg1: number | Point, arg2?: number): Point[] => {
    let x: number, y: number;
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        x = arg1;
        y = arg2;
    } else if (typeof arg1 === 'object') {
        x = arg1.x;
        y = arg1.y;
    } else {
        throw new Error("Invalid arguments");
    }
    return ORTHOGONAL_DIRECTIONS
        .map((direction) => ({ x: x + direction.x, y: y + direction.y }))
        .filter((point) => input[point.y]?.[point.x]);
}

