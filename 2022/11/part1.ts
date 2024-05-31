import * as fs from 'fs';

const input = fs.readFileSync("input", "utf8");

const monkeys = input.split("\n\n").map(monkey => {
    const lines = monkey.split("\n");
    const [, items] = lines[1].split(": ");
    const [safe] = lines[2].match(/(old|\d+) (\*|\+) (old|\d+)$/);
    return {
        items: items.split(", ").map(x => +x),
        operation: new Function("old", `return ${safe}`),
        divisible: Number(lines[3].match(/\d+$/)[0]),
        yes: Number(lines[4].match(/\d+$/)[0]),
        no: Number(lines[5].match(/\d+$/)[0]),
        business: 0,
    };
});

for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
        while (monkey.items.length > 0) {
            let worry = monkey.operation(monkey.items.shift());
            worry = Math.floor(worry / 3);
            const target = worry % monkey.divisible === 0 ? monkey.yes : monkey.no;
            monkeys[target].items.push(worry);
            monkey.business++;
        }
    }
}

const [top1, top2] = monkeys.sort((a, b) => b.business - a.business);

console.log(top1.business * top2.business);