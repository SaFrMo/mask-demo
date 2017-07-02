## What
Proof-of-concept gameplay demos.

## Grid Slice
* The objective of the game is to move a given amount of lines to the goal square of the grid.
* Each line progresses continuously to the end of the grid unless otherwise directed.
* Each line has a set amount of HP. If that HP level reaches 0, the line is destroyed.
* Each grid square has a set amount of HP.
    * A line cannot progress through a square until that square's HP is 0.
    * When a line is occupying a square, that square will not regenerate HP.
    * When a line is not occupying a square, that square will regenerate its HP up to its maximum level.
