import re

from dataclasses import dataclass
from pathlib import Path
from time import time

from py_utils.parsers import parse_args

@dataclass
class Region:
    width: int
    length: int
    shapes: list[int]

    @property
    def could_fit(self) -> bool:
        return self.width * self.length >= sum(count * len(shapes[s]) for s, count in enumerate(self.shapes))

def parse_input(blocks:list) -> list:
    for block in blocks:
        block_list = block.split("\n")
        if block_list[0][-1] == ":":  # Shapes
            idx = int(block_list[0][:-1])
            shapes[idx] = set()
            for r, line in enumerate(block_list[1:]):
                for c, char in enumerate(line):
                    if char == "#":
                        shapes[idx].add((r, c))
        else:  # Regions
            pattern = r"(\d+)"
            for line in block.split("\n"):
                dig = re.findall(pattern, line)
                regions.append(Region(
                    width=int(dig[0]),
                    length=int(dig[1]),
                    shapes=[int(x) for x in dig[2:]]
                ))

if __name__ == "__main__":
    args = parse_args()
    t = time()
    shapes = {}
    regions = []
    with Path(f"{Path(__file__).parent}/inputs/{Path(__file__).stem}.txt").open("r") as file:
        parse_input(file.read().strip().split("\n\n"))
    if args.part == 1:
        print(sum(region.could_fit for region in regions))
    else:
        print("Joyeux Noël !")
    print(time() - t)