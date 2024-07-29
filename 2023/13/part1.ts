import * as fs from "fs";
const input = fs
  .readFileSync("input", "utf8")
  .split("\n\n")
  .map((x) => x.split("\n").map((y) => y.split("")));

let result = 0;

for (const str of input) {
  const rows = Array(str.length)
    .fill("")
    .map((_, i) => str[i].join(""));
  const columns = Array(str[0].length)
    .fill("")
    .map((_, i) => str.map((x) => x[i]).join(""));

  const rowsOfReflection = [];
  for (let r = 1; r < rows.length; r++) {
    rowsOfReflection.push(r);
    for (let i = r - 1, j = r; i >= 0 && j < rows.length; i--, j++) {
      if (rows[i] != rows[j]) {
        rowsOfReflection.splice(rowsOfReflection.length - 1, 1);
        break;
      }
    }
  }

  console.log(rowsOfReflection);

  const columnsOfReflection = [];
  for (let c = 1; c < columns.length; c++) {
    columnsOfReflection.push(c);
    for (let i = c - 1, j = c; i >= 0 && j < columns.length; i--, j++) {
      if (columns[i] != columns[j]) {
        columnsOfReflection.splice(columnsOfReflection.length - 1, 1);
        break;
      }
    }
  }

  result += 100 * (rowsOfReflection[0] ?? 0);
  result += columnsOfReflection[0] ?? 0;
}

console.log(result);
