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

export const parsePoint = (str: string) => {
    const [x, y] = str.split(',').map(Number);
    return { x, y } as Point;
}

export const pointToString = (p: Point) => `${p.x},${p.y}`;

export const drawPoints = (points: Point[]) => {
    let maxX = Math.max(...points.map(p => p.x)) + 1;
    let maxY = Math.max(...points.map(p => p.y)) + 1;
    let board = new Array(maxY).fill(null).map(() => new Array(maxX).fill("."));
    points.forEach((p) => (board[p.y][p.x] = "#"));
    drawBoard(board);
}

export const drawBoard = (board: string[][]) => {
    console.log(board.map(row => row.join("")).join("\n"));
}