import * as fs from 'fs';

const input = fs.readFileSync('input', 'utf8').split('\n');

const parseLine = (line: string) => {
  const targetMatch = line.match(/\[(.*?)\]/);
  const target = targetMatch![1];

  const buttonMatches = line.matchAll(/\(([0-9,]+)\)/g);
  const buttons: number[][] = [];
  for (const match of buttonMatches) {
    buttons.push(match[1].split(',').map(Number));
  }

  return { target, buttons };
};

const solveMinPresses = (target: string, buttons: number[][]): number => {
  const numLights = target.length;
  const targetState = target.split('').map(c => c === '#' ? 1 : 0);

  // State is represented as a string for easier comparison
  const stateToString = (state: number[]) => state.join('');
  const initialState = new Array(numLights).fill(0);

  // BFS to find minimum presses
  const queue: [number[], number][] = [[initialState, 0]]; // [state, presses]
  const visited = new Map<string, number>();
  visited.set(stateToString(initialState), 0);

  while (queue.length > 0) {
    const [state, presses] = queue.shift()!;
    const stateStr = stateToString(state);

    // Check if we reached target
    if (stateStr === stateToString(targetState)) {
      return presses;
    }

    // Try pressing each button
    for (const button of buttons) {
      const newState = [...state];
      // Toggle lights specified by this button
      for (const lightIdx of button) {
        newState[lightIdx] = 1 - newState[lightIdx];
      }

      const newStateStr = stateToString(newState);

      // Only visit if we haven't seen this state or found a better path
      if (!visited.has(newStateStr) || visited.get(newStateStr)! > presses + 1) {
        visited.set(newStateStr, presses + 1);
        queue.push([newState, presses + 1]);
      }
    }
  }

  return -1; // No solution found
};

let totalPresses = 0;

for (const line of input) {
  if (!line.trim()) continue;
  const { target, buttons } = parseLine(line);
  const minPresses = solveMinPresses(target, buttons);
  console.log(`Target: ${target}, Min presses: ${minPresses}`);
  totalPresses += minPresses;
}

console.log(`\nTotal minimum button presses: ${totalPresses}`);

