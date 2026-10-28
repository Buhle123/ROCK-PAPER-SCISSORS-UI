const WINNING_SCORE = 5;

let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
let gameOver = false;


const pickButtons = document.querySelectorAll("#picks button");
const playerScoreEl = document.querySelector("#player-score");
const computerScoreEl = document.querySelector("#computer-score");
const playerPips = document.querySelector("#player-pips");
const computerPips = document.querySelector("#computer-pips");
const roundMessage = document.querySelector("#round-message");
const winnerDisplay = document.querySelector("#winner");
const history = document.querySelector("#history");
const resetButton = document.querySelector("#reset");


function computerPlay() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}


function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "draw";
  }

  const playerWins =
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Paper" && computerSelection === "Rock") ||
    (playerSelection === "Scissors" && computerSelection === "Paper");

  return playerWins ? "player" : "computer";
}


function buildPips(container) {
  container.replaceChildren();
  for (let i = 0; i < WINNING_SCORE; i++) {
    const pip = document.createElement("span");
    pip.className = "cell";
    container.appendChild(pip);
  }
}

function fillPips(container, score) {
  Array.from(container.children).forEach(function (pip, index) {
    pip.classList.toggle("on", index < score);
  });
}

function updateScore() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  fillPips(playerPips, playerScore);
  fillPips(computerPips, computerScore);
}

function addHistoryEntry(text) {
  const entry = document.createElement("li");
  entry.textContent = text;
  history.prepend(entry); // newest round on top
}

function endGame() {
  gameOver = true;
  pickButtons.forEach(function (button) {
    button.disabled = true;
  });

  if (playerScore === WINNING_SCORE) {
    winnerDisplay.dataset.outcome = "win";
    winnerDisplay.textContent =
      "Victory! You beat the Evil AI. The world is saved.";
  } else {
    winnerDisplay.dataset.outcome = "lose";
    winnerDisplay.textContent =
      "Defeat. The Evil AI reached " + WINNING_SCORE + " points first. Muahahaha!";
  }

  resetButton.hidden = false;
  resetButton.focus();
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 0;
  gameOver = false;

  pickButtons.forEach(function (button) {
    button.disabled = false;
  });

  updateScore();
  roundMessage.textContent = "Pick a weapon to begin. I’m waiting.";
  roundMessage.removeAttribute("data-result");
  winnerDisplay.textContent = "";
  winnerDisplay.removeAttribute("data-outcome");
  history.replaceChildren();
  resetButton.hidden = true;
  pickButtons[0].focus();
}


function handleChoice(playerSelection) {
  if (gameOver) {
    return;
  }

  const computerSelection = computerPlay();
  const result = playRound(playerSelection, computerSelection);
  roundNumber++;

  let message;
  if (result === "player") {
    playerScore++;
    message = playerSelection + " beats " + computerSelection + ". You win this round!";
  } else if (result === "computer") {
    computerScore++;
    message = computerSelection + " beats " + playerSelection + ". The Evil AI wins this round!";
  } else {
    message = "You both chose " + playerSelection + ". Draw, no points.";
  }

  roundMessage.textContent = message;
  roundMessage.dataset.result = result;
  addHistoryEntry("Round " + roundNumber + ": " + message);
  updateScore();

  if (playerScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
    endGame();
  }
}


document.querySelectorAll(".goal").forEach(function (el) {
  el.textContent = WINNING_SCORE;
});

buildPips(playerPips);
buildPips(computerPips);
updateScore();

pickButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    handleChoice(button.dataset.choice);
  });
});

resetButton.addEventListener("click", resetGame);
