import * as fs from 'fs';
import { init } from 'z3-solver';

const input = fs.readFileSync('input', 'utf8').trim().split('\n');

const parseLine = (line: string) => {
  // Parse: [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
  const matches = line.match(/\[([.#]+)\] ([()\d,\s]+)+\{([\d,]+)\}/);
  if (!matches) return null;

  // Parse joltage requirements
  const joltages = matches[3].split(',').map(Number);

  // Parse buttons - each button affects certain counters
  const buttonStrings = matches[2].split(' ').filter(s => s);
  const buttons: number[][] = buttonStrings.map(buttonStr => {
    return buttonStr
      .slice(1, -1) // Remove parentheses
      .split(',')
      .map(Number);
  });

  return { joltages, buttons };
};

const solveWithZ3 = async (buttons: number[][], joltages: number[], Context: any): Promise<number> => {
  const { Int, Optimize } = Context('main');
  const optimizer = new Optimize();

  // Create a variable for each button (how many times it's pressed)
  const variables: any[] = [];
  buttons.forEach((_, index) => {
    // Use letters as variable names
    const variable = Int.const(String.fromCharCode(97 + index)); // a, b, c, ...
    // Constraint: each button press count must be >= 0
    optimizer.add(variable.ge(0));
    variables.push(variable);
  });

  // For each joltage counter, create a constraint
  joltages.forEach((targetJoltage, counterIdx) => {
    // Sum up the contribution of each button to this counter
    let sum = Int.val(0);

    buttons.forEach((button, buttonIdx) => {
      // If this button affects this counter, add its contribution
      if (button.includes(counterIdx)) {
        sum = sum.add(variables[buttonIdx]);
      }
    });

    // The sum must equal the target joltage
    optimizer.add(sum.eq(Int.val(targetJoltage)));
  });

  // Minimize the total number of button presses
  const totalPresses = variables.reduce(
    (acc, variable) => acc.add(variable),
    Int.val(0)
  );
  optimizer.minimize(totalPresses);

  // Check if there's a solution
  const result = await optimizer.check();
  if (result === 'sat') {
    const model = optimizer.model();
    return parseInt(model.eval(totalPresses).toString());
  }

  return -1; // No solution found
};

const main = async () => {
  console.log('Solving Part 2 with Z3 solver...\n');

  // Initialize Z3
  const { Context } = await init();

  let totalPresses = 0;
  let machineCount = 0;
  let solved = 0;

  for (const line of input) {
    if (!line.trim()) continue;

    const parsed = parseLine(line);
    if (!parsed) continue;

    const { joltages, buttons } = parsed;
    machineCount++;

    const minPresses = await solveWithZ3(buttons, joltages, Context);

    if (minPresses !== -1) {
      solved++;
      totalPresses += minPresses;
      console.log(`Machine ${machineCount}: ${minPresses} presses`);
    } else {
      console.log(`Machine ${machineCount}: No solution found`);
    }
  }

  console.log(`\nSolved ${solved}/${machineCount} machines`);
  console.log(`Total minimum button presses (Part 2): ${totalPresses}`);
};

// Run the main function
main().catch(console.error);