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

// Using Map for memoization - more efficient than JSON.stringify
const cache = new Map<string, number>();

// Count paths from current device to "out"
const countPaths = (devices: DeviceGraph, current: string): number => {
	// Check cache first
	const cacheKey = current; // Simple key since devices doesn't change
	if (cache.has(cacheKey)) {
		return cache.get(cacheKey)!;
	}

	// Base case: reached the output
	if (current === 'out') {
		cache.set(cacheKey, 1);
		return 1;
	}

	// If device doesn't exist or has no connections
	if (!devices[current]) {
		cache.set(cacheKey, 0);
		return 0;
	}

	// Sum paths through all connected devices
	const result = devices[current].reduce(
		(totalPaths, nextDevice) => totalPaths + countPaths(devices, nextDevice),
		0,
	);

	cache.set(cacheKey, result);
	return result;
};

const result = countPaths(devices, 'you');

// Output result
console.log(result);
