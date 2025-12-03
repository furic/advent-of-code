# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Advent of Code solutions repository containing TypeScript solutions organized by year (2021-2025). Each day's challenge has its own directory with `part1.ts` and `part2.ts` solution files, an `input` file with the puzzle input, an `example` file with sample data, and a `README.md` with the problem description.

## Running Solutions

Solutions are TypeScript files that must be run from within their specific day directory:

```bash
cd 2024/01
ts-node part1.ts    # Run part 1 solution
ts-node part2.ts    # Run part 2 solution
```

**Important**: Solutions read from a file named `input` in the same directory using `fs.readFileSync('input', 'utf8')`, so you must be in the correct directory when running them.

To install ts-node globally (if not already installed):
```bash
npm i -g ts-node
```

Install dependencies (for @types/node):
```bash
npm i
```

Or run without installing dependencies by ignoring type errors:
```bash
ts-node --logError <filename>
```

## Code Architecture

### Shared Utilities

The repository includes shared utility modules at the root level that are commonly used across solutions:

- **[utils.ts](utils.ts)**: Core utilities for grid/2D array operations
  - `getNeighbors()`: Get orthogonal neighbors in a 2D grid (4-directional)
  - `getEightNeighbors()`: Get all 8 surrounding neighbors
  - `getNightNeighbors()`: Get all 9 cells including center (typo in name)
  - `getNeighborPositions()`: Get positions of neighbors as Point objects
  - `parsePoint()`, `pointToString()`: Convert between Point objects and strings
  - `drawPoints()`, `drawBoard()`: Visualize grids in console
  - `findPathScore()`: Pathfinding algorithm (BFS/Dijkstra-like) for minimum/maximum path scores
  - `findPathVisited()`: Pathfinding that returns the full visited path

- **[types.ts](types.ts)**: Shared type definitions
  - `Point`: Basic `{x, y}` coordinate type
  - `PathFindingPoint`: Extended Point with optional `score` and `isWall` properties for pathfinding

- **[constants.ts](constants.ts)**: Direction vectors for grid traversal
  - `ORTHOGONAL_DIRECTIONS`: 4-directional movement (up, down, left, right)
  - `EIGHT_WAY_DIRECTIONS`: 8-directional movement (includes diagonals)
  - `NINE_WAY_DIRECTIONS`: 9-directional (includes center position)

### Directory Structure

```
YYYY/DD/
├── part1.ts       # Solution for part 1
├── part2.ts       # Solution for part 2
├── input          # Puzzle input (specific to user's account)
├── example        # Example input from problem description
└── README.md      # Problem description
```

### Typical Solution Pattern

Solutions typically follow this pattern:

1. Read input using `fs.readFileSync('input', 'utf8')`
2. Parse the input (split by lines, map to numbers, etc.)
3. Process the data using algorithms/data structures
4. Output the result with `console.log()`

Common patterns:
- Input is read as a relative file path (`'input'` not `'./input'`)
- Many solutions involve 2D grids, pathfinding, or graph traversal
- Solutions often use `Map`, `Set`, or custom data structures for optimization

## Code Formatting

```bash
npm run format    # Format all JS/TS/JSON files with Prettier
```

## When Creating New Solutions

- Solutions must be in `YYYY/DD/` directories
- Create both `part1.ts` and `part2.ts` files
- Read input using `fs.readFileSync('input', 'utf8')` (relative path)
- Import shared utilities from root: `import { getNeighbors, Point } from '../../utils'`
- The solution must be run from within its directory (e.g., `cd 2024/01 && ts-node part1.ts`)
