import * as fs from 'fs';

const positions = fs
	.readFileSync('input', 'utf8')
	.split('\n')
	.map((line) => Number(line.split(': ')[1]));

type Player = { position: number; score: number };

const odds = { 3: 1, 4: 3, 5: 6, 6: 7, 7: 6, 8: 3, 9: 1 };

const play = (currPlayer: Player, prevPlayer: Player, memory = new Map<string, number[]>()) => {
	if (prevPlayer.score >= 21) return [0, 1];

	const key = `${currPlayer.position},${currPlayer.score},${prevPlayer.position},${prevPlayer.score}`;
	if (memory.has(key)) return memory.get(key)!;

	const wins = [0, 0];
	for (const roll in odds) {
		const newPosition = (currPlayer.position + Number(roll) - 1) % 10 + 1;
		const nextWins = play(prevPlayer, { position: newPosition, score: currPlayer.score + newPosition }, memory);
		wins[0] += nextWins[1] * odds[roll];
		wins[1] += nextWins[0] * odds[roll];
	}

	memory.set(key, wins);
	return wins;
};

const players: Player[] = positions.map((p) => ({ position: p, score: 0 }));
const wins = play(players[0], players[1]);

console.log(Math.max(...wins));
