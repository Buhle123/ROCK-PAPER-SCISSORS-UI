# Rock, Paper, Scissors (UI Version)

Play Rock, Paper, Scissors against the Evil AI by clicking buttons. The first side to reach **5 points** wins. Everything happens on the page, so no prompts and no console are needed.


## How to run

1. Download or clone the project.
2. Open the hub `index.html` in your browser and choose **Rock, Paper, Scissors**, or open `Main-project/index.html` directly.


An internet connection is needed for the Google Fonts and Phosphor icons. Without one the game still works with fallback fonts and no icons.

## How to play

1. Click **Rock**, **Paper**, or **Scissors**.
2. The Evil AI picks at random. The result of the round appears in the result bar, and the score updates.
3. The first side to reach 5 points wins. The winner is announced and the buttons are disabled.
4. Click **Play again** to reset the score and start over.

### Rules

- Rock beats Scissors, Scissors beats Paper, Paper beats Rock.
- **Draws award no points** to either side.
- The winning score is set by the `WINNING_SCORE` constant in `script.js`.

## What's on the page

| Area | What it shows |
|---|---|
| Scoreboard | Your score and the AI's score, with five pips per side that fill as points are won |
| Weapon buttons | Rock, Paper and Scissors keys |
| Result bar | What happened in the latest round |
| Winner banner | Appears when someone reaches 5 points |
| House rules | A short reminder of the rules |
| Battle log | Every round played, newest first |

Results are announced to screen readers through an `aria-live` region, and all buttons work with the keyboard.

## Project structure

```
project-root/
├── index.html          # Hub page
├── style.css           # Single stylesheet for the whole project
└── Main-project/
    ├── index.html      # Game page
    ├── script.js       # Game logic and DOM updates
    └── README.md
```

## Code overview

| Function | Purpose |
|---|---|
| `computerPlay()` | Randomly returns `"Rock"`, `"Paper"`, or `"Scissors"` |
| `playRound(playerSelection, computerSelection)` | Returns `"player"`, `"computer"`, or `"draw"`. It does not touch the page. |
| `handleChoice(playerSelection)` | Runs when a button is clicked: plays a round, updates the score and log, checks for a winner |
| `updateScore()`, `buildPips()`, `fillPips()` | Update the numbers and pips in the scoreboard |
| `addHistoryEntry(text)` | Adds a round to the battle log |
| `endGame()` | Announces the winner and disables the buttons |
| `resetGame()` | Resets scores, log and buttons for a new game |

All output uses DOM methods (`textContent`, `createElement`, `prepend`, `classList`). There are no `console.log` calls and no `prompt()` or `alert()`.


