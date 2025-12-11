# Day 10: Factory

## Part 1: Indicator Lights

Just across the hall, you find a large factory. Fortunately, the Elves here have plenty of time to decorate. Unfortunately, it's because the factory machines are all offline, and none of the Elves can figure out the initialization procedure.

The Elves do have the manual for the machines, but the section detailing the initialization procedure was eaten by a [Shiba Inu](https://en.wikipedia.org/wiki/Shiba_Inu). All that remains of the manual are some indicator light diagrams, button wiring schematics, and joltage requirements for each machine.

### Example Input

```
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
```

The manual describes one machine per line. Each line contains:
- A single **indicator light diagram** in `[square brackets]`
- One or more **button wiring schematics** in `(parentheses)`
- **Joltage requirements** in `{curly braces}`

### Indicator Lights

To start a machine, its **indicator lights** must match those shown in the diagram:
- `.` means **off**
- `#` means **on**

The machine has the number of indicator lights shown, but its indicator lights are all **initially off**.

For example, `[.##.]` means:
- The machine has 4 indicator lights (all initially off)
- Goal: Light 1 off, Light 2 on, Light 3 on, Light 4 off

### Button Operations

You can **toggle** the state of indicator lights by pushing buttons. Each button lists which indicator lights it toggles:
- `0` = first light
- `1` = second light
- And so on...

When you push a button, each listed indicator light:
- Turns **on** if it was off
- Turns **off** if it was on

Example: Button `(0,3,4)` toggles the 1st, 4th, and 5th indicator lights.
- If lights were `[#.....]`, pressing the button changes them to `[...##.]`

**Note**: In Part 1, joltage requirements are irrelevant and can be ignored.

### Goal

Find the **fewest total button presses** required to correctly configure all indicator lights for all machines.

### Example Solutions

**Machine 1**: `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}`

Possible solutions:
- Press first 3 buttons once each = **3** presses
- Press `(1,3)` once, `(2,3)` once, `(0,1)` twice = **4** presses
- Press all buttons except `(1,3)` once = **5** presses
- **Optimal**: Press `(0,2)` and `(0,1)` once each = **2** presses ✅

**Machine 2**: `[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}`
- **Optimal**: Press last 3 buttons once each = **3** presses

**Machine 3**: `[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`
- **Optimal**: Press `(0,3,4)` and `(0,1,2,4,5)` once each = **2** presses

**Total**: 2 + 3 + 2 = **7** button presses

### Part 1 Answer

**404** button presses

---

## Part 2: Joltage Requirements

All machines are coming online! Now we need to handle the joltage requirements.

### New Mechanics

Each machine has **numeric counters** tracking joltage levels:
- One counter per joltage requirement
- All counters start at **0**

Example: `{3,5,4,7}` means:
- 4 counters, all initially at 0
- Goal: Counter 1 = 3, Counter 2 = 5, Counter 3 = 4, Counter 4 = 7

### Button Effects (Part 2)

In joltage configuration mode, buttons now **increment counters by 1**:
- Button `(1,3)` increases counters 2 and 4 by 1 each
- If current levels are `{0,1,2,3}`, pressing `(1,3)` changes to `{0,2,2,4}`

### Goal

Find the **fewest total button presses** to configure each machine's joltage counters to match requirements.

### Example Solutions

Using the same machines:

```
[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
```

**Machine 1**: Target `{3,5,4,7}`
- Press `(3)` × 1, `(1,3)` × 3, `(2,3)` × 3, `(0,2)` × 1, `(0,1)` × 2
- Total: **10** presses

**Machine 2**: Target `{7,5,12,7,2}`
- Press `(0,2,3,4)` × 2, `(2,3)` × 5, `(0,1,2)` × 5
- Total: **12** presses

**Machine 3**: Target `{10,11,11,5,10,5}`
- Press `(0,1,2,3,4)` × 5, `(0,1,2,4,5)` × 5, `(1,2)` × 1
- Total: **11** presses

**Total**: 10 + 12 + 11 = **33** button presses

### Part 2 Answer

**16,474** button presses

---

## Solution Approach

### Part 1
- Use BFS with XOR operations on binary representation
- State space is manageable (2^n states for n lights)

### Part 2
- This is an Integer Linear Programming (ILP) problem
- Requires constraint solver like Z3
- Minimize Σx_i subject to Ax = b, x ≥ 0, x ∈ ℤ
- Where A[j,i] = 1 if button i affects counter j