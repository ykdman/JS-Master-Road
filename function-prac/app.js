/** @format */

const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPTER_WINS';

let gameIsRunning = false;

const getPlayerChoice = function () {
  const selection = prompt(`${ROCK}, ${PAPER}, or ${SCISSORS}`, '').toUpperCase();

  if (selection !== ROCK && selection !== SCISSORS && selection !== PAPER) {
    alert('Invalid Choice! We Chose Rock For you!');
    selection = ROCK;
  }
  return selection;
};

const getComputerChoice = function () {
  const randomValue = Math.random();

  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = function (computerChoice, playerChoice) {
  const gameResult = {
    playerChoice: playerChoice,
    computerChoice: computerChoice,
    result: '',
  };

  if (computerChoice === playerChoice) {
    gameResult.result = RESULT_DRAW;
  } else if (
    (computerChoice === ROCK && playerChoice === PAPER) ||
    (computerChoice === PAPER && playerChoice === SCISSORS) ||
    (computerChoice === SCISSORS && playerChoice === ROCK)
  ) {
    gameResult.result = RESULT_PLAYER_WINS;
  } else {
    gameResult.result = RESULT_COMPUTER_WINS;
  }

  return `Player : ${gameResult.playerChoice} VS Computer : ${gameResult.computerChoice} = ${gameResult.result}`;
};

startGameBtn.addEventListener('click', function () {
  if (gameIsRunning) {
    return;
  }

  gameIsRunning = true;
  console.log('Game Is Starting !...');
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  const winner = getWinner(computerChoice, playerChoice);
  alert(winner);
});
