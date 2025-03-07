import type { Point, PathFindingPoint } from './types';
import { ORTHOGONAL_DIRECTIONS, EIGHT_WAY_DIRECTIONS, NINE_WAY_DIRECTIONS } from './constants';

/**
 * Retrieves the neighboring elements of a given position in a 2D array.
 *
 * @template T - The type of elements in the 2D array.
 * @param {T[][]} input - The 2D array from which to get the neighbors.
 * @param {number | Point} arg1 - The x-coordinate or a Point object representing the position.
 * @param {number} [arg2] - The y-coordinate (if arg1 is a number).
 * @param {Array<{ x: number, y: number }>} [directions=ORTHOGONAL_DIRECTIONS] - The directions to consider for neighbors.
 * @param {boolean} [filterUndefined=true] - Whether to filter out undefined neighbors.
 * @returns {T[]} An array of neighboring elements.
 * @throws {Error} If the arguments are invalid.
 */
export const getNeighbors = <T>(
    input: T[][],
    arg1: number | Point,
    arg2?: number,
    directions = ORTHOGONAL_DIRECTIONS,
    filterUndefined = true,
): T[] => {
    let x: number, y: number;
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        x = arg1;
        y = arg2;
    } else if (typeof arg1 === 'object') {
        x = arg1.x;
        y = arg1.y;
    } else {
        throw new Error('Invalid arguments');
    }
    const result = directions.map((direction) => input[y + direction.y]?.[x + direction.x]);
    return filterUndefined ? result.filter((n) => n !== undefined) : result;
};

/**
 * Retrieves the eight neighboring elements of a given position in a 2D array.
 *
 * @template T - The type of elements in the 2D array.
 * @param {T[][]} input - The 2D array from which to get the neighbors.
 * @param {number | Point} arg1 - The x-coordinate or a Point object representing the position.
 * @param {number} [arg2] - The y-coordinate (if arg1 is a number).
 * @returns {T[]} An array of eight neighboring elements.
 */
export const getEightNeighbors = <T>(input: T[][], arg1: number | Point, arg2?: number): T[] => {
    return getNeighbors(input, arg1, arg2, EIGHT_WAY_DIRECTIONS);
};

/**
 * Retrieves the eight neighboring elements of a given position in a 2D array, including undefined neighbors.
 *
 * @template T - The type of elements in the 2D array.
 * @param {T[][]} input - The 2D array from which to get the neighbors.
 * @param {number | Point} arg1 - The x-coordinate or a Point object representing the position.
 * @param {number} [arg2] - The y-coordinate (if arg1 is a number).
 * @returns {T[]} An array of eight neighboring elements, including undefined neighbors.
 */
export const getEightNeighborsUnfiltered = <T>(
    input: T[][],
    arg1: number | Point,
    arg2?: number,
): T[] => {
    return getNeighbors(input, arg1, arg2, EIGHT_WAY_DIRECTIONS, false);
};

/**
 * Retrieves the nine neighboring elements of a given position in a 2D array.
 *
 * @template T - The type of elements in the 2D array.
 * @param {T[][]} input - The 2D array from which to get the neighbors.
 * @param {number | Point} arg1 - The x-coordinate or a Point object representing the position.
 * @param {number} [arg2] - The y-coordinate (if arg1 is a number).
 * @returns {T[]} An array of nine neighboring elements.
 */
export const getNightNeighbors = <T>(input: T[][], arg1: number | Point, arg2?: number): T[] => {
    return getNeighbors(input, arg1, arg2, NINE_WAY_DIRECTIONS);
};

/**
 * Retrieves the nine neighboring elements of a given position in a 2D array, including undefined neighbors.
 *
 * @template T - The type of elements in the 2D array.
 * @param {T[][]} input - The 2D array from which to get the neighbors.
 * @param {number | Point} arg1 - The x-coordinate or a Point object representing the position.
 * @param {number} [arg2] - The y-coordinate (if arg1 is a number).
 * @returns {T[]} An array of nine neighboring elements, including undefined neighbors.
 */
export const getNightNeighborsUnfiltered = <T>(
    input: T[][],
    arg1: number | Point,
    arg2?: number,
): T[] => {
    return getNeighbors(input, arg1, arg2, NINE_WAY_DIRECTIONS, false);
};

/**
 * Retrieves the positions of the neighboring elements of a given position in a 2D array.
 *
 * @param {T[][]} input - The 2D array from which to get the neighbor positions.
 * @param {number | Point} arg1 - The x-coordinate or a Point object representing the position.
 * @param {number} [arg2] - The y-coordinate (if arg1 is a number).
 * @returns {Point[]} An array of Points representing the positions of the neighboring elements.
 * @throws {Error} If the arguments are invalid.
 */
export const getNeighborPositions = <T>(
    input: T[][],
    arg1: number | Point,
    arg2?: number,
): Point[] => {
    let x: number, y: number;
    if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        x = arg1;
        y = arg2;
    } else if (typeof arg1 === 'object') {
        x = arg1.x;
        y = arg1.y;
    } else {
        throw new Error('Invalid arguments');
    }
    return ORTHOGONAL_DIRECTIONS.map((direction) => ({
        x: x + direction.x,
        y: y + direction.y,
    })).filter((point) => input[point.y]?.[point.x]);
};

/**
 * Parses a string into a Point object.
 *
 * @param {string} str - The string to parse.
 * @returns {Point} The parsed Point object.
 */
export const parsePoint = (str: string) => {
    const [x, y] = str.split(',').map(Number);
    return { x, y } as Point;
};

/**
 * Converts a Point object to a string.
 *
 * @param {Point} p - The Point object to convert.
 * @returns {string} The string representation of the Point object.
 */
export const pointToString = (p: Point) => `${p.x},${p.y}`;

/**
 * Draws points on a board.
 *
 * @param {Point[]} points - The points to draw.
 */
export const drawPoints = (points: Point[]) => {
    let maxX = Math.max(...points.map((p) => p.x)) + 1;
    let maxY = Math.max(...points.map((p) => p.y)) + 1;
    let board = new Array(maxY).fill(null).map(() => new Array(maxX).fill('.'));
    points.forEach((p) => (board[p.y][p.x] = '#'));
    drawBoard(board);
};

/**
 * Draws a board.
 *
 * @param {any[][]} board - The board to draw.
 */
export const drawBoard = (board: any[][]) => {
    console.log(board.map((row) => row.join('')).join('\n'));
};

/**
 * Finds the path score in a board using a pathfinding algorithm.
 *
 * @param {PathFindingPoint[][]} board - A 2D array representing the board, where each element is a PathFindingPoint.
 * @param {PathFindingPoint} start - The starting point for the pathfinding algorithm.
 * @param {(current: Point) => boolean} isEnd - A function that determines if the current point is the end point.
 * @param {boolean} [findMin=true] - A boolean indicating whether to find the minimum score path (default is true).
 * @returns {number} The path score.
 */
export const findPathScore = (
    board: PathFindingPoint[][],
    start: PathFindingPoint,
    isEnd: (current: Point) => boolean,
    findMin = true,
) => {
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
        let searches = neighbors
            .map((neighbor) => ({
                x: neighbor.x,
                y: neighbor.y,
                score: current.score + neighbor.score,
            }))
            .filter((search) => {
                const key = `${search.x},${search.y}`;
                return (
                    !visited.has(key) ||
                    (findMin ? visited.get(key) > search.score : visited.get(key) < search.score)
                );
            });

        queue.push(...searches);
        queue.sort((a, b) => (a.score - b.score) * (findMin ? 1 : -1));
        searches.forEach((search) => visited.set(`${search.x},${search.y}`, search.score));
    }

    return result;
};

/**
 * Finds the path visited in a board using a pathfinding algorithm.
 *
 * @param {PathFindingPoint[][]} board - A 2D array representing the board, where each element is a PathFindingPoint.
 * @param {PathFindingPoint} start - The starting point for the pathfinding algorithm.
 * @param {(current: Point) => boolean} isEnd - A function that determines if the current point is the end point.
 * @param {boolean} [findMin=true] - A boolean indicating whether to find the minimum score path (default is true).
 * @returns {PathFindingPoint[]} An array of PathFindingPoint representing the path visited.
 */
export const findPathVisited = (
    board: PathFindingPoint[][],
    start: PathFindingPoint,
    isEnd: (current: Point) => boolean,
    findMin = true,
) => {
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
        let searches = neighbors
            .map((neighbor) => ({
                x: neighbor.x,
                y: neighbor.y,
                score: current.score + neighbor.score,
                visited: [...current.visited, neighbor],
            }))
            .filter((search) => {
                const key = `${search.x},${search.y}`;
                return (
                    !visited.has(key) ||
                    (findMin ? visited.get(key) > search.score : visited.get(key) < search.score)
                );
            });

        queue.push(...searches);
        queue.sort((a, b) => (a.score - b.score) * (findMin ? 1 : -1));
        searches.forEach((search) => visited.set(`${search.x},${search.y}`, search.score));
    }

    return result;
};
