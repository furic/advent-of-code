\--- Day 24: Never Tell Me The Odds ---
---------------------------------------

It seems like something is going wrong with the snow-making process. Instead of forming snow, the water that's been absorbed into the air seems to be forming [hail](https://en.wikipedia.org/wiki/Hail)!

Maybe there's something you can do to break up the hailstones?

Due to strong, probably-magical winds, the hailstones are all flying through the air in perfectly linear trajectories. You make a note of each hailstone's _position_ and _velocity_ (your puzzle input). For example:

    19, 13, 30 @ -2,  1, -2
    18, 19, 22 @ -1, -1, -2
    20, 25, 34 @ -2, -2, -4
    12, 31, 28 @ -1, -2, -1
    20, 19, 15 @  1, -5, -3
    

Each line of text corresponds to the position and velocity of a single hailstone. The positions indicate where the hailstones are _right now_ (at time `0`). The velocities are constant and indicate exactly how far each hailstone will move in _one nanosecond_.

Each line of text uses the format `px py pz @ vx vy vz`. For instance, the hailstone specified by `20, 19, 15 @ 1, -5, -3` has initial X position `20`, Y position `19`, Z position `15`, X velocity `1`, Y velocity `-5`, and Z velocity `-3`. After one nanosecond, the hailstone would be at `21, 14, 12`.

Perhaps you won't have to do anything. How likely are the hailstones to collide with each other and smash into tiny ice crystals?

To estimate this, consider only the X and Y axes; _ignore the Z axis_. Looking _forward in time_, how many of the hailstones' _paths_ will intersect within a test area? (The hailstones themselves don't have to collide, just test for intersections between the paths they will trace.)

In this example, look for intersections that happen with an X and Y position each at least `7` and at most `27`; in your actual data, you'll need to check a much larger test area. Comparing all pairs of hailstones' future paths produces the following results:

    Hailstone A: 19, 13, 30 @ -2, 1, -2
    Hailstone B: 18, 19, 22 @ -1, -1, -2
    Hailstones' paths will cross inside the test area (at x=14.333, y=15.333).
    
    Hailstone A: 19, 13, 30 @ -2, 1, -2
    Hailstone B: 20, 25, 34 @ -2, -2, -4
    Hailstones' paths will cross inside the test area (at x=11.667, y=16.667).
    
    Hailstone A: 19, 13, 30 @ -2, 1, -2
    Hailstone B: 12, 31, 28 @ -1, -2, -1
    Hailstones' paths will cross outside the test area (at x=6.2, y=19.4).
    
    Hailstone A: 19, 13, 30 @ -2, 1, -2
    Hailstone B: 20, 19, 15 @ 1, -5, -3
    Hailstones' paths crossed in the past for hailstone A.
    
    Hailstone A: 18, 19, 22 @ -1, -1, -2
    Hailstone B: 20, 25, 34 @ -2, -2, -4
    Hailstones' paths are parallel; they never intersect.
    
    Hailstone A: 18, 19, 22 @ -1, -1, -2
    Hailstone B: 12, 31, 28 @ -1, -2, -1
    Hailstones' paths will cross outside the test area (at x=-6, y=-5).
    
    Hailstone A: 18, 19, 22 @ -1, -1, -2
    Hailstone B: 20, 19, 15 @ 1, -5, -3
    Hailstones' paths crossed in the past for both hailstones.
    
    Hailstone A: 20, 25, 34 @ -2, -2, -4
    Hailstone B: 12, 31, 28 @ -1, -2, -1
    Hailstones' paths will cross outside the test area (at x=-2, y=3).
    
    Hailstone A: 20, 25, 34 @ -2, -2, -4
    Hailstone B: 20, 19, 15 @ 1, -5, -3
    Hailstones' paths crossed in the past for hailstone B.
    
    Hailstone A: 12, 31, 28 @ -1, -2, -1
    Hailstone B: 20, 19, 15 @ 1, -5, -3
    Hailstones' paths crossed in the past for both hailstones.
    

So, in this example, `_2_` hailstones' future paths cross inside the boundaries of the test area.

However, you'll need to search a much larger test area if you want to see if any hailstones might collide. Look for intersections that happen with an X and Y position each at least `200000000000000` and at most `400000000000000`. Disregard the Z axis entirely.

Considering only the X and Y axes, check all pairs of hailstones' future paths for intersections. _How many of these intersections occur within the test area?_

\--- Part Two ---
-----------------

Upon further analysis, it doesn't seem like _any_ hailstones will naturally collide. It's up to you to fix that!

You find a rock on the ground nearby. While it seems extremely unlikely, if you throw it just right, you should be able to _hit every hailstone in a single throw_!

You can use the probably-magical winds to reach _any integer position_ you like and to propel the rock at _any integer velocity_. Now _including the Z axis_ in your calculations, if you throw the rock at time `0`, where do you need to be so that the rock _perfectly collides with every hailstone_? Due to probably-magical inertia, the rock won't slow down or change direction when it collides with a hailstone.

In the example above, you can achieve this by moving to position `24, 13, 10` and throwing the rock at velocity `-3, 1, 2`. If you do this, you will hit every hailstone as follows:

    Hailstone: 19, 13, 30 @ -2, 1, -2
    Collision time: 5
    Collision position: 9, 18, 20
    
    Hailstone: 18, 19, 22 @ -1, -1, -2
    Collision time: 3
    Collision position: 15, 16, 16
    
    Hailstone: 20, 25, 34 @ -2, -2, -4
    Collision time: 4
    Collision position: 12, 17, 18
    
    Hailstone: 12, 31, 28 @ -1, -2, -1
    Collision time: 6
    Collision position: 6, 19, 22
    
    Hailstone: 20, 19, 15 @ 1, -5, -3
    Collision time: 1
    Collision position: 21, 14, 12
    

Above, each hailstone is identified by its initial position and its velocity. Then, the time and position of that hailstone's collision with your rock are given.

After 1 nanosecond, the rock has _exactly the same position_ as one of the hailstones, obliterating it into ice dust! Another hailstone is smashed to bits two nanoseconds after that. After a total of 6 nanoseconds, all of the hailstones have been destroyed.

So, at time `0`, the rock needs to be at X position `24`, Y position `13`, and Z position `10`. Adding these three coordinates together produces `_47_`. (Don't add any coordinates from the rock's velocity.)

Determine the exact position and velocity the rock needs to have at time `0` so that it perfectly collides with every hailstone. _What do you get if you add up the X, Y, and Z coordinates of that initial position?_