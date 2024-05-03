const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split('\n')
  .map(line => {
    if (line.match(/^([a-z]+): (\d+)$/)) {
      const [, variable, number] = line.match(/^([a-z]+): (\d+)$/);
      return { variable, number: Number(number) };
    } else if (line.match(/^([a-z]+): ([a-z]+) (.) ([a-z]+)$/)) {
      const [, variable, param1, operator, param2] = line.match(
        /^([a-z]+): ([a-z]+) (.) ([a-z]+)$/,
      );
      return { variable, param1, operator, param2 };
    }
  })
  .reduce((obj, x) => ({ ...obj, [x.variable]: x }), {});

const calc = (name) => {
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
};

const result = calc('root');

console.log(result);