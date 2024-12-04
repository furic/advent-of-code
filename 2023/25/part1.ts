import * as fs from 'fs';

const input: string[] = fs.readFileSync('input', 'utf8').split('\n');

const components: Record<string, string[]> = {};
const connections: Set<string> = new Set();

for (const line of input) {
    const [component1, connected] = line.split(': ');
    const component2s = connected.split(' ');
    for (const component2 of component2s) {
        components[component1] ??= [];
        components[component1].push(component2);
        components[component2] ??= [];
        components[component2].push(component1);
        connections.add([component1, component2].sort().join(','));
    }
}

const betweenness: Record<string, number> = {};
for (const component of Object.keys(components)) {
    const visited: Set<string> = new Set();
    const queue: [string, string[]][] = [[component, []]];
    while (queue.length > 0) {
        for (let _ = 0; _ < queue.length; _++) {
            const [current, path] = queue.shift()!;
            for (const connection of path) {
                betweenness[connection] ??= 0;
                betweenness[connection]++;
            }
            for (const next of components[current]) {
                if (!visited.has(next)) {
                    visited.add(next);
                    queue.push([next, [...path, [current, next].sort().join(',')]]);
                }
            }
        }
    }
}

const importantConnections: string[][] = Object.keys(betweenness)
    .sort((a, b) => betweenness[b] - betweenness[a])
    .slice(0, 3)
    .map((x) => x.split(','));

for (const connection of importantConnections) {
    const [comp1, comp2] = connection;
    components[comp1]?.splice(components[comp1].indexOf(comp2), 1);
    if (components[comp1]?.length === 0) {
        delete components[comp1];
    }
    components[comp2]?.splice(components[comp2].indexOf(comp1), 1);
    if (components[comp2]?.length === 0) {
        delete components[comp2];
    }
}

const lastComponent: string | undefined = Object.keys(components).slice(-1)[0];
if (lastComponent) {
    const visited: Set<string> = new Set([lastComponent]);
    const queue: string[] = [lastComponent];
    while (queue.length > 0) {
        const current: string = queue.pop()!;
        for (const next of components[current] || []) {
            if (!visited.has(next)) {
                visited.add(next);
                queue.push(next);
            }
        }
    }
    console.log(visited.size * (Object.keys(components).length - visited.size));
}