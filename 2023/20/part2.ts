const fs = require("fs");
const input = fs.readFileSync("input", "utf8").split("\n");

const modules = {};
const result = [];

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
            return;
        }
        if (destination.type === "%" && module.pulseSent) {
            return;
        }
        destination.pulseReceived = module.pulseSent;
    }
}

function filterDestinations(module) {
    return destination => typeof destination != "undefined" && !(destination.type === "%" && module.pulseSent);
}

const broadcaster = Object.values(modules).find((x) => x.type === "b");
result.push(...Array(broadcaster.destinations.length).fill(0));

for (let i = 0; i < broadcaster.destinations.length; i++) {
    while (true) {
        const queue = [broadcaster.destinations[i]];
        result[i]++;
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
        if (Object.values(modules).filter(x => x.type === "%").every(x => !x.on)) {
            break;
        }
    }
}

// we can use brute-force but will takes forever, so we analyze the flow as below:
// rx inputs from &ql, receives low pulse only when ql receive all high pulses
// ql inputs from &fh, &mf, &fz, &ss
// fh, mf, fz, ss are inverters, only have 1 input each from &sn, &hl, &tf, &lr
// when all fh, mf, fz, ss receive low pulse, ql receives all high pulses
// sn, hl, tf, lr all receive pulse from multiplie flip-flops
// sn, hl, tf, lr send low pulses, only when all inputs of them sent high pulses
// all flip-flops inputs of sn, hl, tf, lr must be off and receive low pulse, to send high pulses
// if either of those flip-flops is on, that won't work
// theoretically, it requires a complete reset-state of all flip-flops to achieve that
// which is the lcm of pulses of all destinations from boardcaster

function lcm(...numbers) {
    return numbers.reduce((a, b) => a * b / gcd(a, b));
}

function gcd(...numbers) {
    return numbers.reduce((a, b) => {
        while (b) {
            const t = b;
            b = a % b;
            a = t;
        }
        return a;
    });
}

console.log(lcm(...result));