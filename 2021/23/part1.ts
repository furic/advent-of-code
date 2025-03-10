import * as fs from 'fs';

type AmphipodType = 'A' | 'B' | 'C' | 'D';
type Amphipod = { type: AmphipodType; x: number; y: number; settled: boolean };
type State = { amphipods: Amphipod[]; energy: number };

const maze = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => line.split(''));

let amphipods: Amphipod[] = [];
for (let y = 0; y < maze.length; y++) {
	for (let x = 0; x < maze[y].length; x++) {
		if (maze[y][x].match(/[A-D]/)) {
			amphipods.push({ x, y, type: maze[y][x] as AmphipodType, settled: false });
		}
	}
}

const AMPHIPOD_PROPS = {
	A: { price: 1, home: 3 },
	B: { price: 10, home: 5 },
	C: { price: 100, home: 7 },
	D: { price: 1000, home: 9 },
};

const toKey = (amphipods: Amphipod[]) =>
	amphipods
		.sort((a, b) => a.x - b.x || a.y - b.y)
		.map((s) => `${s.x},${s.y},${s.type}`)
		.join(':');

const getPossibleMoves = (state: State) => {
	let move = (from: Amphipod, to: Amphipod) =>
		({
			amphipods: state.amphipods.map((m) => (m !== from ? m : { ...to, settled: to.y !== 1 })), // replace with new position
			energy:
				state.energy +
				AMPHIPOD_PROPS[from.type].price * (Math.abs(from.x - to.x) + Math.abs(from.y - to.y)), // add cost of move
		}) as State;
	return state.amphipods.flatMap((member) => {
		let { x, y, type, settled } = member;
		if (settled) return []; // it is already in the right room
		if (y === 1) {
			// we want to bring it into the room
			let go = { type, x: AMPHIPOD_PROPS[type].home, y: 3, settled: false };
			if (state.amphipods.some((m) => (m.x - x) * (m.x - go.x) < 0 && m.y === 1)) return []; // the path to the room is blocked
			if (state.amphipods.some((m) => m.x === go.x && m.type !== type)) return []; // there's a wrong letter in the room
			while (state.amphipods.some((m) => m.x === go.x && m.y === go.y)) go.y--; // search for the lowest free space in the room
			return [move(member, go)]; //move into the room
		} else {
			// we want to bring it out of the room
			let options = [];
			if (state.amphipods.some((m) => m.x === x && m.y < y)) return []; // the path out of the room is blocked
			for (let i = x; i >= 1 && !state.amphipods.some((m) => m.x === i && m.y === 1); i--) {
				options.push(i); // collect options to the left
			}
			for (let i = x; i <= 11 && !state.amphipods.some((m) => m.x === i && m.y === 1); i++) {
				options.push(i); // collect options to the right
			}
			options = options.filter((i) => ![3, 5, 7, 9].includes(i)); // don't stand in the doorway don't block up the hall
			return options.map((x) => move(member, { type, x, y: 1, settled: false })); // return all remaining options to move out of the room
		}
	});
};

const queue: State[] = [{ amphipods, energy: 0 }];
const visited = new Map<string, number>();

let result = Infinity;

while (queue.length > 0) {
	const current = queue.shift();
	if (current.amphipods.every((a) => a.settled)) {
		result = Math.min(current.energy, result);
		break;
	}

	const possibleMoves = getPossibleMoves(current);

	let searches = possibleMoves.filter((possibleMove) => {
		const key = toKey(possibleMove.amphipods);
		return (
			(!visited.has(key) || visited.get(key) > possibleMove.energy) &&
			visited.set(key, possibleMove.energy)
		);
	});

	queue.push(...searches);
	queue.sort((a, b) => a.energy - b.energy);
}

console.log(result);
