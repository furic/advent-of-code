import * as fs from 'fs';

// Type definitions
type DeviceGraph = Record<string, string[]>;

// Read input and parse the device network
const devices: DeviceGraph = (() => {
	const input = fs.readFileSync('input', 'utf8').split('\n');
	const devices: DeviceGraph = {};

	for (const line of input) {
		if (!line.trim()) continue;
		const [name, connections] = line.split(': ');
		devices[name] = connections.split(' ');
	}

	return devices;
})();

// Using Map for memoization with composite key
const cache = new Map<string, number>();

// Count valid paths from current device to "out"
// A path is valid only if it passes through both "dac" and "fft" devices
const countValidPaths = (
	devices: DeviceGraph,
	current: string,
	hasDac: boolean,
	hasFft: boolean,
): number => {
	// Create composite cache key
	const cacheKey = `${current}-${hasDac}-${hasFft}`;
	if (cache.has(cacheKey)) {
		return cache.get(cacheKey)!;
	}

	// Base case: reached the output
	if (current === 'out') {
		// Path is valid only if it passed through both dac and fft
		const result = hasDac && hasFft ? 1 : 0;
		cache.set(cacheKey, result);
		return result;
	}

	// If device doesn't exist or has no connections
	if (!devices[current]) {
		cache.set(cacheKey, 0);
		return 0;
	}

	// Update flags if we're at dac or fft
	const newHasDac = hasDac || current === 'dac';
	const newHasFft = hasFft || current === 'fft';

	// Sum valid paths through all connected devices
	const result = devices[current].reduce(
		(totalPaths, nextDevice) =>
			totalPaths + countValidPaths(devices, nextDevice, newHasDac, newHasFft),
		0,
	);

	cache.set(cacheKey, result);
	return result;
};

// Start from "svr" with both flags false (Part 2 starts from "svr" instead of "you")
const result = countValidPaths(devices, 'svr', false, false);

// Output result
console.log(result);