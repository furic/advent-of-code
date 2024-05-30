import * as fs from 'fs';
const input = fs.readFileSync("input", "utf8").split('\n')
  .map((line: string) => {
    if (line.match(/^([a-z]+): (\d+)$/)) {
      const [, variable, number] = line.match(/^([a-z]+): (\d+)$/)!;
      return { variable, number: +number };
    } else if (line.match(/^([a-z]+): ([a-z]+) (.) ([a-z]+)$/)) {
      const [, variable, param1, operator, param2] = line.match(
        /^([a-z]+): ([a-z]+) (.) ([a-z]+)$/,
      )!;
      return { variable, param1, operator, param2 };
    }
  })
  .reduce((obj: { variable: string, param1: string, operator: string, param2: string }, x: { variable: string, param1: string, operator: string, param2: string }) =>
    ({ ...obj, [x.variable]: x }), {});

const calc = (name: string): number => {
  const line = input[name];
  if (line.number !== undefined) {
    return line.number;
  }
  const val1 = calc(line.param1);
  const val2 = calc(line.param2);
  switch (line.operator) {
    case '+':
      return val1 + val2;
    case '-':
      return val1 - val2;
    case '/':
      return val1 / val2;
    case '*':
      return val1 * val2;
  }
  return 0;
};

const calc2 = (name: string, result: number): number => {
  if (name === 'humn') {
    return result;
  }

  const line = input[name];
  const val1 = calc(line.param1);
  const val2 = calc(line.param2);

  if (Number.isNaN(val1)) {
    if (name === 'root') {
      return calc2(line.param1, val2);
    }
    switch (line.operator) {
      case '+':
        return calc2(line.param1, result - val2);
      case '-':
        return calc2(line.param1, result + val2);
      case '*':
        return calc2(line.param1, result / val2);
      case '/':
        return calc2(line.param1, result * val2);
    }
  }

  if (Number.isNaN(val2)) {
    if (name === 'root') {
      return calc2(line.param2, val1);
    }
    switch (line.operator) {
      case '+':
        return calc2(line.param2, result - val1);
      case '-':
        return calc2(line.param2, val1 - result);
      case '*':
        return calc2(line.param2, result / val1);
      case '/':
        return calc2(line.param2, val1 / result);
    }
  }

  return 0;
};

input.humn.number = NaN;
const result = calc2('root', 0);

console.log(result);