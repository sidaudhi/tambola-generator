# tambola-generator

A library for generating tambola tickets and the draw sequence
[Home / demo page](http://tambolatickets.herokuapp.com/)

## Installation

We use **npm** for dependency management, run

```shell
npm install --save tambola-generator
```

## Usage

In your NodeJS application, require the module:

```shell
var tambola = require('tambola-generator');
```

To get tickets, use the getTickets(count) method:

```shell
tambola.getTickets(100) //This generates 100 tambola tickets
```

To get the draw sequence, use the getDrawSequence() method:

```shell
tambola.getDrawSequence() //Returns numbers 1-90 scrambled
```

## JSON

```shell
// Tickets array
[
  [
    [0,18,23,40,48,0,0,73,0],
    [5,0,0,0,42,52,0,80,83],
    [0,20,0,0,49,58,65,0,85]
  ],
  [
    [10,0,21,34,0,0,65,0,83],
    [0,11,0,36,41,0,62,0,85],
    [0,19,26,37,43,0,67,0,0]
  ]
]
```

```shell
// Draw Sequence
[72,65,47,89,42,4,61,84,36,22,37,18,9,27,
12,71,46,15,30,55,17,3,56,25,68,80,43,26,
50,39,53,38,60,31,28,11,8,62,49,79,51,35,
14,67,45,41,40,5,44,34,73,32,86,69,70,48,
21,33,83,13,54,77,78,90,29,6,52,59,58,66,
76,1,10,24,19,64,85,7,74,2,16,63,88,23,57
,87,81,82,20,75]
```

## Rules

A ticket consists of a random distribution of 15 numbers
between 1-90 in a 3x9 grid

- RULE #1 - Each row cannot have more than 5 numbers
- RULE #2 - Each column is assigned a range of numbers only: 1-10 can appear only in column 1, 11-20 can appear only in column 2, 81-90 can appear only in column 9
- RULE #3 - In a specific column, numbers must be arranged in ascending order
  from top to bottom
- RULE #4 - Each column must have at least 1 number

## Algorithm

- Generate a grouped list of numbers from 1-90, grouped by every 10th number. Each group corresponds to a column of the ticket.
- Generate a 2D array of 3 rows and 9 columns filled with 0s.
- For each column of the ticket, randomly choose a row and number from the grouped list above.
  - If the row is not already full (<5) and the number in that location is 0,
    - Insert the chosen number
    - Delete the chosen number from the grouped list
- Recursively, loop through all rows and colums of the ticket:
  - Generate a random chance value as a boolean.
  - If the row is not already full (<5) and the column is not already full (<3) and the random chance is true and the value at the location is 0
    - Insert the chosen number
    - Delete the chosen number from the grouped list
