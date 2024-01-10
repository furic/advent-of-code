\--- Day 18: Lavaduct Lagoon ---
--------------------------------

Thanks to your efforts, the machine parts factory is one of the first factories up and running since the lavafall came back. However, to catch up with the large backlog of parts requests, the factory will also need a _large supply of lava_ for a while; the Elves have already started creating a large lagoon nearby for this purpose.

However, they aren't sure the lagoon will be big enough; they've asked you to take a look at the _dig plan_ (your puzzle input). For example:

    R 6 (#70c710)
    D 5 (#0dc571)
    L 2 (#5713f0)
    D 2 (#d2c081)
    R 2 (#59c680)
    D 2 (#411b91)
    L 5 (#8ceee2)
    U 2 (#caa173)
    L 1 (#1b58a2)
    U 2 (#caa171)
    R 2 (#7807d2)
    U 3 (#a77fa3)
    L 2 (#015232)
    U 2 (#7a21e3)
    

The digger starts in a 1 meter cube hole in the ground. They then dig the specified number of meters _up_ (`U`), _down_ (`D`), _left_ (`L`), or _right_ (`R`), clearing full 1 meter cubes as they go. The directions are given as seen from above, so if "up" were north, then "right" would be east, and so on. Each trench is also listed with _the color that the edge of the trench should be painted_ as an [RGB hexadecimal color code](https://en.wikipedia.org/wiki/RGB_color_model#Numeric_representations).

When viewed from above, the above example dig plan would result in the following loop of _trench_ (`#`) having been dug out from otherwise _ground-level terrain_ (`.`):

    #######
    #.....#
    ###...#
    ..#...#
    ..#...#
    ###.###
    #...#..
    ##..###
    .#....#
    .######
    

At this point, the trench could contain 38 cubic meters of lava. However, this is just the edge of the lagoon; the next step is to _dig out the interior_ so that it is one meter deep as well:

    #######
    #######
    #######
    ..#####
    ..#####
    #######
    #####..
    #######
    .######
    .######
    

Now, the lagoon can contain a much more respectable `_62_` cubic meters of lava. While the interior is dug out, the edges are also painted according to the color codes in the dig plan.

The Elves are concerned the lagoon won't be large enough; if they follow their dig plan, _how many cubic meters of lava could it hold?_

\--- Part Two ---
-----------------

The Elves were right to be concerned; the planned lagoon would be _much too small_.

After a few minutes, someone realizes what happened; someone _swapped the color and instruction parameters_ when producing the dig plan. They don't have time to fix the bug; one of them asks if you can _extract the correct instructions_ from the hexadecimal codes.

Each hexadecimal code is _six hexadecimal digits_ long. The first five hexadecimal digits encode the _distance in meters_ as a five-digit hexadecimal number. The last hexadecimal digit encodes the _direction to dig_: `0` means `R`, `1` means `D`, `2` means `L`, and `3` means `U`.

So, in the above example, the hexadecimal codes can be converted into the true instructions:

*   `#70c710` = `R 461937`
*   `#0dc571` = `D 56407`
*   `#5713f0` = `R 356671`
*   `#d2c081` = `D 863240`
*   `#59c680` = `R 367720`
*   `#411b91` = `D 266681`
*   `#8ceee2` = `L 577262`
*   `#caa173` = `U 829975`
*   `#1b58a2` = `L 112010`
*   `#caa171` = `D 829975`
*   `#7807d2` = `L 491645`
*   `#a77fa3` = `U 686074`
*   `#015232` = `L 5411`
*   `#7a21e3` = `U 500254`

Digging out this loop and its interior produces a lagoon that can hold an impressive `_952408144115_` cubic meters of lava.

Convert the hexadecimal color codes into the correct instructions; if the Elves follow this new dig plan, _how many cubic meters of lava could the lagoon hold?_