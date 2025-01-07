import type { Point, PathFindingPoint } from "./types";
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

export const findPathScore = (board: PathFindingPoint[][], start: PathFindingPoint, isEnd: (current: Point) => boolean, findMin = true) => {
    const queue = [{ x: start.x, y: start.y, score: start.score }];
    const visited = new Map<string, number>();

    let result = Infinity;

    while (queue.length > 0) {
        const current = queue.shift();
        if (isEnd(current)) {
            result = Math.min(current.score, result);
            continue;
        }

        const neighbors = getNeighbors(board, current).filter((neighbor) => !neighbor.isWall);
        let searches = neighbors.map((neighbor) => ({
            x: neighbor.x,
            y: neighbor.y,
            score: current.score + neighbor.score,
        })).filter((search) => {
            const key = `${search.x},${search.y}`;
            return (!visited.has(key) || (findMin ? visited.get(key) > search.score : visited.get(key) < search.score));
        })

        queue.push(...searches);
        queue.sort((a, b) => (a.score - b.score) * (findMin ? 1 : -1));
        searches.forEach((search) => visited.set(`${search.x},${search.y}`, search.score));
    }

    return result;
}

export const findPathVisited = (board: PathFindingPoint[][], start: PathFindingPoint, isEnd: (current: Point) => boolean, findMin = true) => {
    const queue = [{ x: start.x, y: start.y, score: start.score, visited: [start] }];
    const visited = new Map<string, number>();

    let score = Infinity;
    let result = [start];

    while (queue.length > 0) {
        const current = queue.shift();
        if (isEnd(current)) {
            score = Math.min(current.score, score);
            result = current.visited;
            continue;
        }

        const neighbors = getNeighbors(board, current).filter((neighbor) => !neighbor.isWall);
        let searches = neighbors.map((neighbor) => ({
            x: neighbor.x,
            y: neighbor.y,
            score: current.score + neighbor.score,
            visited: [...current.visited, neighbor],
        })).filter((search) => {
            const key = `${search.x},${search.y}`;
            return (!visited.has(key) || (findMin ? visited.get(key) > search.score : visited.get(key) < search.score));
        })

        queue.push(...searches);
        queue.sort((a, b) => (a.score - b.score) * (findMin ? 1 : -1));
        searches.forEach((search) => visited.set(`${search.x},${search.y}`, search.score));
    }

    return result;
}