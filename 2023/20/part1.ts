const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

const modules = {};
const result = [0, 0];

for (const line of input) {
    const type = line[0];
    const moduleName = type === "b" ? "broadcaster" : line.split(" -> ")[0].slice(1);
    const destinations = line.split(" -> ")[1].split(", ");
    modules[moduleName] = { destinations, type: type, pulseSent: false, pulseReceived: false };
    if (type === "%") {
        modules[moduleName].on = false;
    }  else if (type === "&") {
        modules[moduleName].inputs = {};
    }
}

for (const module of Object.values(modules)) {
    module.destinations = module.destinations.map(x => modules[x]);
}

for (const [moduleName, module] of Object.entries(modules)) {
    for (const destination of module.destinations) {
        if (typeof destination != "undefined" && destination.type === "&") {
            destination.inputs[moduleName] = module;
        }
    }
}

function receivePulse(module) {
    return destination => {
        if (typeof destination === "undefined") {
            result[Number(module.pulseSent)]++;
        } else if (destination.type === "%" && module.pulseSent) {
            result[1]++;
        } else {
            result[Number(module.pulseSent)]++;
            destination.pulseReceived = module.pulseSent;
        }
    }
}

function filterDestinations(module) {
    return destination => typeof destination != "undefined" && !(destination.type === "%" && module.pulseSent);
}

for (let i = 0; i < 1000; i++) {
    const queue = [Object.values(modules).find((x) => x.type === "b")];
    result[0]++;
    while (queue.length > 0) {
        const module = queue.shift();
        if (typeof module == "undefined") {
            continue;
        }
        switch (module.type) {
            case "%":
                if (!module.pulseReceived) {
                    module.pulseSent = module.on = !module.on;
                }
                break;
            case "&":
                module.pulseSent = !Object.values(module.inputs).every(x => x.pulseSent);
                break;
        }
        if (module.type === "&" || !module.pulseReceived) {
            module.destinations.forEach(receivePulse(module));
            queue.push(...module.destinations.filter(filterDestinations(module)));
        }
    }
}

console.log(result[0] * result[1]);